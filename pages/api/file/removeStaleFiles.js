import { v4 as uuidv4 } from "uuid";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";

import { getMongoClient } from "../../../src/lib/db";
import { ACHIEVEMENTS_SCHEMA_MAP } from "../../../src/data/schema";
import { INPUT_TYPE } from "../../../src/data/types/types";
import { isEmptyObject } from "../../../src/lib/util";
import { deleteFile } from "../../../src/lib/aws-wrapper";

const getCurrentFiles = (rawData) => {
  const fileSchemas = {};

  for (const [key, category] of ACHIEVEMENTS_SCHEMA_MAP) {
    const file_fields = [];
    category.fields.forEach((field) => {
      if (field.input_type === INPUT_TYPE.FILE)
        file_fields.push(field.db_field);
    });
    fileSchemas[category.key] = file_fields;
  }

  const currentFiles = [];

  rawData.forEach((user) => {
    Object.entries(fileSchemas).forEach(
      ([achievementCategory, file_fields]) => {
        if (!!user[achievementCategory]) {
          file_fields.forEach((file_field) => {
            user[achievementCategory].forEach((achievement) => {
              if (
                !!achievement[file_field] &&
                !isEmptyObject(achievement[file_field])
              ) {
                const item = achievement[file_field];
                if (item.isLink === false) {
                  currentFiles.push(item.fuid);
                }
              }
            });
          });
        }
      }
    );
  });

  return currentFiles;
};

const getFilesToRemove = (allSavedFiles, currentRequiredFiles) => {
  const currentRequiredFilesHash = {};
  currentRequiredFiles.forEach(
    (fuid) => (currentRequiredFilesHash[fuid] = true)
  );
  const filesToRemove = [];

  allSavedFiles.forEach((fuid) => {
    if (!currentRequiredFilesHash[fuid]) filesToRemove.push(fuid);
  });

  return filesToRemove;
};

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();

  const fileCollection = connection.db("users").collection("files");
  const usersCollection = connection.db("users").collection("faculties");

  let allSavedFiles, currentRequiredFiles, filesToRemove;

  try {
    allSavedFiles = (await fileCollection.find().toArray())
      .filter((file) => !!file.fuid)
      .map((file) => file.fuid);
    currentRequiredFiles = getCurrentFiles(
      await usersCollection.find().toArray()
    );
    filesToRemove = getFilesToRemove(allSavedFiles, currentRequiredFiles);

    await Promise.all(
      filesToRemove.map(async (fuid) => {
        deleteFile(fuid);
        await fileCollection.deleteOne({ fuid: fuid });
      })
    );
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    connection.close();
    return;
  }

  res.status(StatusCodes.OK).json(filesToRemove);
  connection.close();
}

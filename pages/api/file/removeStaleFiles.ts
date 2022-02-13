import { v4 as uuidv4 } from "uuid";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";

import * as util from "@lib/util";
import { getMongoClient } from "@lib/db";
import { deleteFile } from "@lib/aws-wrapper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!util.assertRequestMethod(req, res, util.MethodType.DELETE)) return;

  const session = await getSession({ req });
  if (!util.assertIsAdmin(session, res)) return;

  const client = await getMongoClient();
  const connection = await client.connect();

  const fileCollection = connection.db("users").collection("files");
  const usersCollection = connection.db("users").collection("faculties");

  let allSavedFiles: string[],
    currentRequiredFiles: string[],
    filesToRemove: string[];

  try {
    allSavedFiles = (await fileCollection.find().toArray())
      .filter((file) => !!file.fuid)
      .map((file) => file.fuid);
    currentRequiredFiles = util.getCurrentFiles(
      await usersCollection.find().toArray()
    );
    filesToRemove = util.getFilesToRemove(allSavedFiles, currentRequiredFiles);

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

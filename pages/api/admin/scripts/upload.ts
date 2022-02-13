import fs from "fs";
import path from "path";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { v4 as uuidv4 } from "uuid";

import { getMongoClient } from "@lib/db";
import { hashPassword } from "@lib/auth";
import { getEmptyUserDocument } from "@data/schema";
import { toTypedAchievements, getTypedDocument } from "@lib/type_converter";
import { ACHIEVEMENTS_SCHEMA_MAP } from "@data/schema";

const getEmptyAchievementData = (achievementCategory) => {
  let emptyAchievementData = {};
  ACHIEVEMENTS_SCHEMA_MAP.get(achievementCategory).fields.forEach((field) => {
    emptyAchievementData[field.db_field] = field.value;
  });
  emptyAchievementData["id"] = uuidv4();
  emptyAchievementData["last_modified"] = new Date().toISOString();
  return emptyAchievementData;
};

export default async function handler(req, res) {
  const buffer = fs.readFileSync(
    path.join(process.cwd(), "data_for_bsh", "final_user_data.json")
  );

  const collectionData = JSON.parse(buffer.toString());

  let final_users = [];

  final_users = await Promise.all(
    collectionData.map(async (user) => {
      const EMPTY_USER_DOCUMENT = getTypedDocument(getEmptyUserDocument());

      let emptyUserDocument = {
        ...EMPTY_USER_DOCUMENT,
        hashedPassword: await hashPassword("123"),
      };

      emptyUserDocument["profile"]["employeeID"] =
        user["profile"]["employeeID"];
      emptyUserDocument["profile"]["name"] = user["profile"]["name"];

      ACHIEVEMENTS_SCHEMA_MAP.forEach((_schema) => {
        const achievementCategory = _schema.key;

        if (!!user[achievementCategory]) {
          user[achievementCategory].forEach((entry) => {
            const updateObject = {
              ...getEmptyAchievementData(achievementCategory),
              ...entry,
            };
            toTypedAchievements([updateObject], achievementCategory);

            emptyUserDocument[achievementCategory].push(updateObject);
          });
        }
      });

      return emptyUserDocument;
    })
  );

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  let insertResult = await usersCollection.insertMany(final_users);
  connection.close();

  res.status(201).json(final_users);
}

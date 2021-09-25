import fs from "fs";
import path from "path";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { v4 as uuidv4 } from "uuid";

import { getMongoClient } from "../../../src/lib/db.js";
import { hashPassword } from "../../../src/lib/auth";
import { getEmptyUserDocument } from "../../../src/data/schema";
import { toTypedAchievements } from "../../../src/lib/type_converter";
import { getTypedDocument } from "../../../src/lib/type_converter";
import { MASTER_SCHEMA } from "../../../src/data/schema.js";
import { ACHIEVEMENTS } from "../../../src/data/schema.js";

const getEmptyAchievementData = (achievementCategory) => {
  let emptyAchievementData = {};
  MASTER_SCHEMA[achievementCategory]["fields"].forEach((field) => {
    emptyAchievementData[field.db_field] = field.value;
  });
  emptyAchievementData["id"] = uuidv4();
  emptyAchievementData["last_modified"] = new Date().toISOString();
  return emptyAchievementData;
};

export default async function handler(req, res) {
  const buffer = fs.readFileSync(path.join(process.cwd(), "final_data.json"));

  const collectionData = JSON.parse(buffer);

  let final_users = [];

  final_users = await Promise.all(
    collectionData.map(async (user) => {
      const EMPTY_USER_DOCUMENT = getTypedDocument(getEmptyUserDocument());

      let emptyUserDocument = {
        ...EMPTY_USER_DOCUMENT,
        employeeID: user["employeeID"],
        hashedPassword: await hashPassword("123"),
      };

      emptyUserDocument["profile"]["name"] = user["profile"]["name"];

      ACHIEVEMENTS.forEach((achievement) => {
        const achievementCategory = achievement.SCHEMA.key;

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

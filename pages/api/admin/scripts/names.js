import fs from "fs";
import path from "path";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { v4 as uuidv4 } from "uuid";

import { getMongoClient } from "../../../../src/lib/db.js";
import { hashPassword } from "../../../../src/lib/auth";
import { getEmptyUserDocument } from "../../../../src/data/schema";
import { toTypedAchievements } from "../../../../src/lib/type_converter";
import { getTypedDocument } from "../../../../src/lib/type_converter";
import { MASTER_SCHEMA } from "../../../../src/data/schema.js";
import { ACHIEVEMENTS } from "../../../../src/data/schema.js";

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
  const buffer = fs.readFileSync(
    path.join(process.cwd(), "data_for_bsh", "final_user_data.json")
  );

  const collectionData = JSON.parse(buffer);

  let final_users = [];

  final_users = collectionData.map((user) => {
    return user["profile"]["employeeID"];
  });

  res.status(200).json(final_users);
}

/* export default async function handler(req, res) {
  const buffer = fs.readFileSync(path.join(process.cwd(), "final_data.json"));

  const collectionData = JSON.parse(buffer);

  const finalCollectionData = collectionData.map((user) => {
    delete user["seminar-attended"];
    delete user["webinar-attended"];
    return user;
  });

  res.status(200).json(finalCollectionData);
}
 */

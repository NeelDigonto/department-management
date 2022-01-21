import fs from "fs";
import path from "path";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

import { MASTER_SCHEMA } from "../../../../src/data/schema";

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

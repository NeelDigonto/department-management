import fs from "fs";
import path from "path";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const buffer = fs.readFileSync(
    path.join(process.cwd(), "data_for_bsh", "final_user_data.json")
  );

  const collectionData = JSON.parse(buffer.toString());

  let final_users = [];

  final_users = collectionData.map((user) => {
    return user["profile"]["employeeID"];
  });

  res.status(200).json(final_users);
}

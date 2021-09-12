import { getMongoClient } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
import { MASTER_SCHEMA, getEmptyUserDocument } from "../../../data/schema";
import {
  getTypedAchievement,
  getTypedProfile,
  getTypedDocument,
} from "../../../lib/type_converter";

export default async function handler(req, res) {
  //check if user is allowed to acces this api
  if (req.method !== "PATCH") {
    console.error("Other than PATCH method received");
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const { employeeID, password, name } = req.body;

  const EMPTY_USER_DOCUMENT = getTypedDocument(getEmptyUserDocument());

  let emptyUserDocument = {
    ...EMPTY_USER_DOCUMENT,
    employeeID: employeeID,
    hashedPassword: await hashPassword(password),
  };

  emptyUserDocument["profile"]["name"] = name;

  const insertResult = await usersCollection.insertOne(emptyUserDocument);
  connection.close();

  res.status(200).json({ isCreated: insertResult.insertedCount === 1 });
}

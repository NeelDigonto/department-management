import { getMongoClient } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
import { MASTER_SCHEMA, EMPTY_USER_DOCUMENT } from "../../../data/schema";

export default async function handler(req, res) {
  //check if user is allowed to acces this api
  if (req.method !== "PATCH") {
    console.error("Other than PATCH method received");
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const { employeeID } = req.body;

  let deleteResult;
  try {
    deleteResult = await usersCollection.deleteOne({ employeeID: employeeID });
  } catch (e) {
    console.error(e);
  }
  connection.close();

  if (!!deleteResult) {
    res.status(200).json({ isDeleted: deleteResult.deletedCount === 1 });
  } else res.status(400);
}

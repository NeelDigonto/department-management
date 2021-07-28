import { getMongoClient } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
import { schema } from "../../../data/schema";

export default async function handler(req, res) {
  //check if user is allowed to acces this api
  if (req.method !== "PATCH") {
    console.error("Other than PATCH method received");
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const { employeeID, password } = req.body;

  let mockProfile = {};
  schema["Profile"].forEach((item) => {
    mockProfile[item.db_field] = item.value;
  });

  const emptyUserDocument = {
    employeeID: employeeID,
    hashedPassword: await hashPassword(password),
    Profile: mockProfile,
    Publications: [],
  };

  const insertResult = await usersCollection.insertOne(emptyUserDocument);
  connection.close();

  res.status(200).json({ isCreated: insertResult.insertedCount === 1 });
}

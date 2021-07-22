import { getMongoClient } from "../../../../lib/db";

export default async function handler(req, res) {
  //check if user is allowed to acces this api
  console.log("req came");
  if (req.method !== "PATCH") {
    console.error("on update req sent");
    return;
  }

  const { employeeID, fieldToUpdate, newValue } = req.body;

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const fieldToSet = `Profile.${fieldToUpdate}`;
  const updateResult = await usersCollection.updateOne(
    {
      employeeID: employeeID,
    },
    { $set: { [fieldToSet]: newValue } }
  );

  connection.close();

  const status = updateResult.modifiedCount === 1;

  res.status(200).json({ status: status });
}

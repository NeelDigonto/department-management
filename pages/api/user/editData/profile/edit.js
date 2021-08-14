import { getMongoClient } from "../../../../../lib/db";

export default async function handler(req, res) {
  //check if user is allowed to acces this api
  console.log("req came");
  if (req.method !== "PATCH") {
    console.error("on update req sent");
    return;
  }

  const { employeeID, newProfile } = req.body;

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const updateResult = await usersCollection.updateOne(
    {
      employeeID: employeeID,
    },
    { $set: { profile: newProfile } }
  );

  connection.close();

  const isUpdated = updateResult.modifiedCount === 1;

  res.status(200).json({ isUpdated: isUpdated });
}

import { getMongoClient } from "../../../../../lib/db";

export default async function handler(req, res) {
  //check if user is allowed to acces this api
  if (req.method !== "PATCH") {
    console.error("on update req sent");
    return;
  }

  const { achievementCategory } = req.query;

  const { employeeID, delete_id_no, updateObject } = req.body;

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  let updateQuerry = {};
  for (let [key, value] of Object.entries(updateObject)) {
    updateQuerry[`${achievementCategory}.$.${key}`] = value;
  }

  const updateResult = await usersCollection.updateOne(
    {
      employeeID: employeeID,
      [`${achievementCategory}.id`]: delete_id_no,
    },
    { $set: updateQuerry }
  );

  connection.close();

  const isUpdated = updateResult.modifiedCount === 1;

  res.status(200).json({ isUpdated: isUpdated });
}
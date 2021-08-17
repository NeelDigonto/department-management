import { getMongoClient } from "../../../../../lib/db.js";

export default async function handler(req, res) {
  //check if user is allowed to acces this api
  if (req.method !== "PATCH") {
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const { employeeID, delete_id_no } = req.body;

  const updateResult = await usersCollection.updateOne(
    {
      employeeID: employeeID,
    },
    {
      $pull: { publications: { id: delete_id_no } },
    }
  );

  connection.close();
  const deleted = updateResult.modifiedCount === 1;

  res.status(200).json({ deleted: deleted, updateResult: updateResult });
}

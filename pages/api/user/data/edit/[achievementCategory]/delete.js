import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { getMongoClient } from "../../../../../../src/lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  const { achievementCategory } = req.query;

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const { employeeID, delete_id_no } = req.body;

  const updateResult = await usersCollection.updateOne(
    {
      employeeID: employeeID,
    },
    {
      $pull: { [achievementCategory]: { id: delete_id_no } },
    }
  );

  connection.close();
  const deleted = updateResult.modifiedCount === 1;

  res.status(200).json({ deleted: deleted, updateResult: updateResult });
}

import { getMongoClient } from "../../../../../lib/db.js";

export default async function handler(req, res) {
  //check if user is allowed to acces this api
  if (req.method !== "POST") {
    return;
  }

  const { employeeID, emptyPublicationData } = req.body;

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const updateResult = await usersCollection.updateOne(
    {
      employeeID: employeeID,
    },
    {
      $push: {
        publications: {
          $each: [emptyPublicationData],
          $sort: { sl_no: 1 },
        },
      },
    }
  );

  connection.close();

  const created = updateResult.modifiedCount === 1;

  res.status(200).json({ created: true });
}

import { getMongoClient } from "../../../../lib/db";

export default async function handler(req, res) {
  //check if user is allowed to acces this api

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const userDocument = await usersCollection.findOne({
    employeeID: req.query.employeeID,
  });

  connection.close();

  delete userDocument["hashedPassword"];
  delete userDocument["_id"];

  res.status(200).json(userDocument);
}

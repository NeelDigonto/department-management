import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { getMongoClient } from "../../../../../../src/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  let userDocument;
  try {
    userDocument = await usersCollection.findOne({
      employeeID: req.query.employeeID,
    });
  } catch (err) {
    console.error(err);
    connection.close();
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }

  connection.close();

  delete userDocument["hashedPassword"];
  delete userDocument["_id"];

  res.status(StatusCodes.OK).json(userDocument);
}

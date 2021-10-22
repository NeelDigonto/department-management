import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";

import { getMongoClient } from "../../../../../../src/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  const { employeeID } = req.query;

  const session = await getSession({ req });
  if (!session) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  } else if (
    session.user.isAdmin === false &&
    session.user.employeeID !== employeeID
  ) {
    res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  let userDocument;
  try {
    userDocument = await usersCollection.findOne({
      "profile.employeeID": employeeID,
    });
  } catch (err) {
    console.error(err);
    connection.close();
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }

  connection.close();

  delete userDocument["hashedPassword"];
  delete userDocument["_id"];

  res.status(StatusCodes.OK).json(userDocument);
}

import { getSession } from "next-auth/client";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

import { getMongoClient } from "../../../../src/lib/db";
import { hashPassword } from "../../../../src/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  } else if (session.user.isAdmin !== true) {
    res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();
  const usersCollection = connection.db("users").collection("faculties");

  const { employeeID } = req.query;

  let deleteResult;
  try {
    deleteResult = await usersCollection.deleteOne({
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

  if (!!deleteResult && deleteResult.deletedCount === 1) {
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  } else
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
}

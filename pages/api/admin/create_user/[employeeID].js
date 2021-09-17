import { getSession } from "next-auth/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { getMongoClient } from "../../../../src/lib/db";
import { hashPassword } from "../../../../src/lib/auth";
import { MASTER_SCHEMA, getEmptyUserDocument } from "../../../../src/data/schema";
import {
  getTypedAchievement,
  getTypedProfile,
  getTypedDocument,
} from "../../../../src/lib/type_converter";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
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
  const { password, name } = req.body;

  const EMPTY_USER_DOCUMENT = getTypedDocument(getEmptyUserDocument());

  let emptyUserDocument = {
    ...EMPTY_USER_DOCUMENT,
    employeeID: employeeID,
    hashedPassword: await hashPassword(password),
  };

  emptyUserDocument["profile"]["name"] = name;

  let insertResult;
  try {
    insertResult = await usersCollection.insertOne(emptyUserDocument);
  } catch (err) {
    console.error(err);
    connection.close();
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }
  connection.close();

  if (!!insertResult && insertResult.insertedCount === 1) {
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
  } else res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
}

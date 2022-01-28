import { getSession } from "next-auth/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

import * as util from "../../../../src/lib/util";
import { getMongoClient } from "../../../../src/lib/db";
import { hashPassword } from "../../../../src/lib/auth";
import { getEmptyUserDocument } from "../../../../src/data/schema";
import { getTypedDocument } from "../../../../src/lib/type_converter";

export default async function handler(req, res) {
  if (!util.assertRequestMethod(req, res, util.MethodType.POST)) return;

  const session = await getSession({ req });
  if (!util.assertIsAdmin(session, res)) return;

  const client = await getMongoClient();
  const connection = await client.connect();
  const usersCollection = connection.db("users").collection("faculties");

  const { employeeID } = req.query;
  const { password, name } = req.body;

  const EMPTY_USER_DOCUMENT = getTypedDocument(getEmptyUserDocument());

  let emptyUserDocument = {
    ...EMPTY_USER_DOCUMENT,
    hashedPassword: await hashPassword(password),
  };

  emptyUserDocument["profile"]["employeeID"] = employeeID;
  emptyUserDocument["profile"]["name"] = name;

  let insertResult;
  try {
    insertResult = await usersCollection.insertOne(emptyUserDocument);
  } catch (err) {
    console.error(err);
    connection.close();
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }
  connection.close();

  if (!!insertResult && insertResult.insertedCount === 1) {
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
  } else
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
}

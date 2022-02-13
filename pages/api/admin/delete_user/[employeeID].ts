import { getSession } from "next-auth/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

import * as util from "@lib/util";
import { getMongoClient } from "@lib/db";
import { hashPassword } from "@lib/auth";

export default async function handler(req, res) {
  if (!util.assertRequestMethod(req, res, util.MethodType.DELETE)) return;

  const session = await getSession({ req });
  if (!util.assertIsAdmin(session, res)) return;

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

import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";

import * as util from "@lib/util";
import { getMongoClient } from "@lib/db";
import { toTypedProfile } from "@lib/type_converter";
import { Session } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!util.assertRequestMethod(req, res, util.MethodType.PATCH)) return;

  const { employeeID } = req.query;

  const session: Session = await getSession({ req });
  if (!util.assertIsAuthorized(session, res)) return;

  const { newProfile } = req.body;

  toTypedProfile(newProfile);

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  let updateResult;
  try {
    updateResult = await usersCollection.updateOne(
      {
        "profile.employeeID": employeeID,
      },
      { $set: { profile: newProfile } }
    );
  } catch (err) {
    console.error(err);
    connection.close();
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }
  connection.close();

  if (!!updateResult && updateResult.modifiedCount === 1) {
    res.status(StatusCodes.OK).json({ updatedProfile: newProfile });
  } else
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
}

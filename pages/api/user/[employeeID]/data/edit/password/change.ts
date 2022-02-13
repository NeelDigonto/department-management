import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";

import * as util from "@lib/util";
import { getMongoClient } from "@lib/db";
import { hashPassword, verifyPassword } from "@lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!util.assertRequestMethod(req, res, util.MethodType.PATCH)) return;

  const { employeeID } = req.query;

  const session = await getSession({ req });
  if (!util.assertIsAuthorized(session, res)) return;

  const { oldPassword, newPassword } = req.body;

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  let updateResult;
  try {
    const userDocument = await usersCollection.findOne(
      {
        "profile.employeeID": employeeID,
      },
      { projection: { hashedPassword: 1 } }
    );

    if (await verifyPassword(oldPassword, userDocument["hashedPassword"])) {
      updateResult = await usersCollection.updateOne(
        {
          "profile.employeeID": employeeID,
        },
        { $set: { hashedPassword: await hashPassword(newPassword) } }
      );

      if (!!updateResult && updateResult.modifiedCount === 1) {
        res.status(StatusCodes.OK).json({ newPassword: newPassword });
      } else
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    } else {
      res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
      return;
    }
  } catch (err) {
    console.error(err);
    connection.close();
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }
  connection.close();
}

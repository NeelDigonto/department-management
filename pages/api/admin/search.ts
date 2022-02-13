import { getSession } from "next-auth/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

import { getMongoClient } from "@lib/db";
import { toTypedQuerry } from "@lib/type_converter";
import * as util from "@lib/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!util.assertRequestMethod(req, res, util.MethodType.POST)) return;

  const session = await getSession({ req });
  if (!util.assertIsAdmin(session, res)) return;

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const { filter } = req.body;

  try {
    toTypedQuerry(filter);
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }

  const pipeline = [
    {
      $match: filter,
    },
    {
      $project: {
        _id: 0,
        "profile.employeeID": 1,
        "profile.name": 1,
        "profile.department": 1,
        "profile.designation": 1,
      },
    },
  ];

  let payload;
  try {
    payload = await usersCollection.aggregate(pipeline).toArray();
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    connection.close();
    return;
  }
  connection.close();

  res.status(StatusCodes.OK).json({ searchResult: payload });
}

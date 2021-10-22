import { getSession } from "next-auth/client";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

import { getMongoClient } from "../../../src/lib/db";
import { toTypedQuerry } from "../../../src/lib/type_converter";

export default async function handler(req, res) {
  if (req.method !== "POST") {
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

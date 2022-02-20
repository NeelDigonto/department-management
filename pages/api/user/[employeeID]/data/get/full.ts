import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";
import * as Constants from "@lib/Constants";

import { getMongoClient } from "@lib/db";
import * as util from "@lib/util";

export default async function handler(req, res) {
  if (!util.assertRequestMethod(req, res, util.MethodType.GET)) return;

  const { employeeID } = req.query;

  const session = await getSession({ req });
  if (!util.assertIsAuthorized(session, res)) return;

  const client = await getMongoClient();
  const connection = await client.connect();
  const usersCollection = connection
    .db("users")
    .collection(Constants.FACULTY_COLLECTION_NAME);

  let userDocument;

  try {
    userDocument = await usersCollection.findOne({
      "profile.employeeID": employeeID,
    });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  } finally {
  }

  console.log(userDocument.profile);

  // branch
  if (employeeID === Constants.CENTRAL_EMPLOYEE_ID) {
    connection.close();
    delete userDocument["_id"];
    res.status(StatusCodes.OK).json(userDocument);
  } else {
    let centralDocument;
    try {
      centralDocument = await usersCollection.findOne({
        "profile.employeeID": Constants.CENTRAL_EMPLOYEE_ID,
      });
    } catch (err) {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
      return;
    } finally {
      connection.close();
    }

    delete userDocument["hashedPassword"];
    delete userDocument["_id"];
    delete centralDocument["_id"];
    delete centralDocument["profile"];

    res.status(StatusCodes.OK).json({ ...userDocument, ...centralDocument });
  }
}

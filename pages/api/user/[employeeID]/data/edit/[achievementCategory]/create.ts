import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";

import * as Constants from "@lib/Constants";
import { getMongoClient } from "@lib/db";
import { toTypedAchievements } from "@lib/type_converter";
import { getEmptyAchievementData } from "@data/schema";
import * as util from "@lib/util";

export default async function handler(req, res) {
  if (!util.assertRequestMethod(req, res, util.MethodType.POST)) return;

  const { employeeID, achievementCategory } = req.query;

  const session = await getSession({ req });
  if (!util.assertIsAuthorized(session, res)) return;

  const emptyAchievementData = req.body["newObject"]
    ? req.body["newObject"]
    : getEmptyAchievementData(achievementCategory);

  // throw error if the date format is not right, and fail the request
  toTypedAchievements([emptyAchievementData], achievementCategory);

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection
    .db("users")
    .collection(Constants.FACULTY_COLLECTION_NAME);

  //put more checks
  let updateResult;
  try {
    updateResult = await usersCollection.updateOne(
      {
        "profile.employeeID": employeeID,
      },
      {
        $push: {
          [achievementCategory]: {
            $each: [emptyAchievementData],
            // $sort: { sl_no: 1 }, //no need to sort now
          },
        },
      }
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
    res
      .status(StatusCodes.CREATED)
      .json({ createdAchievement: emptyAchievementData });
  } else
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
}

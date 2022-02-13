import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";

import * as Constants from "@lib/Constants";
import { getMongoClient } from "@lib/db";
import { toTypedAchievements } from "@lib/type_converter";
import * as util from "@lib/util";

export default async function handler(req, res) {
  if (!util.assertRequestMethod(req, res, util.MethodType.PATCH)) return;

  const { employeeID, achievementCategory, id } = req.query;

  const session = await getSession({ req });
  if (!util.assertIsAuthorized(session, res)) return;

  const { updateObject } = req.body;

  toTypedAchievements([updateObject], achievementCategory);

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection
    .db("users")
    .collection(Constants.FACULTY_COLLECTION_NAME);

  let updateQuerry = {};
  for (let [key, value] of Object.entries(updateObject)) {
    updateQuerry[`${achievementCategory}.$.${key}`] = value;
  }

  let updateResult;
  try {
    updateResult = await usersCollection.updateOne(
      {
        "profile.employeeID": employeeID,
        [`${achievementCategory}.id`]: id,
      },
      { $set: updateQuerry }
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
    res.status(StatusCodes.OK).json({ updatedAchievement: updateObject });
  } else
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
}

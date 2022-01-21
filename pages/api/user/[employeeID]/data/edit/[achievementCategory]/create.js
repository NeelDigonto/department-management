import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";
import { v4 as uuidv4 } from "uuid";

import { getMongoClient } from "../../../../../../../src/lib/db";
import { toTypedAchievements } from "../../../../../../../src/lib/type_converter";
import { MASTER_SCHEMA } from "../../../../../../../src/data/schema";

const getEmptyAchievementData = (achievementCategory) => {
  let emptyAchievementData = {};
  MASTER_SCHEMA[achievementCategory]["fields"].forEach((field) => {
    emptyAchievementData[field.db_field] = field.value;
  });
  emptyAchievementData["id"] = uuidv4();
  emptyAchievementData["last_modified"] = new Date().toISOString();
  return emptyAchievementData;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  const { employeeID, achievementCategory } = req.query;

  const session = await getSession({ req });
  if (!session) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  } else if (
    session.user.isAdmin === false &&
    session.user.employeeID !== employeeID
  ) {
    res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
    return;
  }

  const emptyAchievementData = req.body["newObject"]
    ? req.body["newObject"]
    : getEmptyAchievementData(achievementCategory);

  // throw error if the date format is not right, and fail the request
  toTypedAchievements([emptyAchievementData], achievementCategory);

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

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

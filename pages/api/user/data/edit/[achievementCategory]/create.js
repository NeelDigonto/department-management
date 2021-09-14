import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from "http-status-codes";

import { getMongoClient } from "../../../../../../lib/db.js";
import {
  toTypedAchievements,
  toTypedProfile,
  getTypedDocument,
} from "../../../../../../lib/type_converter";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  const { achievementCategory } = req.query;

  const { employeeID, emptyAchievementData } = req.body;

  // throw error if the dat eformat is not right, and fail the request
  toTypedAchievements([emptyAchievementData], achievementCategory);

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  console.log(achievementCategory);

  const updateResult = await usersCollection.updateOne(
    {
      employeeID: employeeID,
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

  connection.close();

  const created = updateResult.modifiedCount === 1;

  res.status(200).json({ created: created });
}

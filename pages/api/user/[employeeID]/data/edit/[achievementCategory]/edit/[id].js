import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";

import { getMongoClient } from "../../../../../../../../src/lib/db";
import { toTypedAchievements } from "../../../../../../../../src/lib/type_converter";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  const { employeeID, achievementCategory, id } = req.query;

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

  const { updateObject } = req.body;

  toTypedAchievements([updateObject], achievementCategory);

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

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

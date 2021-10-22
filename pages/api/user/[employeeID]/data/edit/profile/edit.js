import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";

import { getMongoClient } from "../../../../../../../src/lib/db";
import { toTypedProfile } from "../../../../../../../src/lib/type_converter";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  const { employeeID } = req.query;

  const session = await getSession({ req });
  if (!session) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  } else if (
    session.user.isAdmin === false &&
    session.user.employeeID !== req.query.employeeID
  ) {
    res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
    return;
  }

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

import { getMongoClient } from "../../../lib/db";
import { isEmptyObject } from "../../../lib/util";
import { MASTER_SCHEMA } from "../../../data/schema";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE } from "../../../data/types/types";
import {
  toTypedAchievements,
  toTypedProfile,
  getTypedDocument,
  toTypedQuerry,
} from "../../../lib/type_converter";

export default async function handler(req, res) {
  //check if user is allowed to acces this api

  if (req.method !== "POST") {
    console.error("Other than POST method received");
    res.status("400").json({ msg: "Only accepts post request on this route" });
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const { filter } = req.body;

  toTypedQuerry(filter);

  const pipeline = [
    {
      $match: filter,
    },
    {
      $project: {
        _id: 0,
        employeeID: 1,
        "profile.name": 1,
        "profile.department": 1,
        "profile.designation": 1,
      },
    },
  ];

  const payload = await usersCollection.aggregate(pipeline).toArray();

  res.status(200).json({ searchResult: payload });

  connection.close();
}

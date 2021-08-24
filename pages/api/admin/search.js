import { getMongoClient } from "../../../lib/db";
import { isEmptyObject } from "../../../lib/util";
import { MASTER_SCHEMA } from "../../../data/schema";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE } from "../../../data/types/types";

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

  const { filter: rawFilter, sort: rawSort, display: rawDisplay } = req.body;

  const filter = {
    "profile.f_name": { $regex: "jahar dey", $options: "im" },
    "profile.m_name": { $regex: "dey", $options: "im" },
    //"profile.bld_grp": { $regex: "AB+", $options: "" },
    "profile.bld_grp": { $in: ["A+", "AB+"] },
    //"profile.dob": { $lte: new Date(2001, 11, 20) },

    /* "journal-publications": {
      $elemMatch: {
        title: { $regex: "integration", $options: "im" },
        author: { $regex: "saikat", $options: "im" },
        studs_involved: { $gte: 1 },
      },
    }, */
  };

  // https://docs.mongodb.com/manual/reference/operator/query-comparison/
  // https://docs.mongodb.com/manual/reference/operator/query/regex/
  // https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/

  const payload = await usersCollection
    .find(
      filter
      /*   {
        sort: {
          "journal-publications.title": -1,
        },
        projection: { profile: { name: 1, f_name: 1 }, "journal-publications": 1 },
      }  */
    )
    .toArray();

  await usersCollection.insertOne({ aDate: new Date() });
  const test = await usersCollection.find().toArray();

  /* const sanitizedPayload = payload.map((document) => {
    let temp_obj = { ...document };
    delete temp_obj["hashedPassword"];
    delete temp_obj["_id"];
    return temp_obj;
  });

  res.status(200).json(sanitizedPayload); */
  res.status(200).json(test);

  connection.close();
}
//studs_involved

/*  let filter = {};
  if (!!rawFilter["profile"] && !isEmptyObject(rawFilter)) {
    for (let [key, value] of Object.entries(rawFilter["profile"])) {
      const field_schema = MASTER_SCHEMA["profile"].find((field) => field.db_field === key);
      if (!!field_schema) {
        switch (field_schema.input_type) {
          case INPUT_TYPE.TEXT: {
            if (typeof value === "string")
              filter[`profile.${key}`] = { $regex: value, $options: "im" };
            else {
              console.warn("Wrong type found, search.js");
            }
            break;
          }
          case INPUT_TYPE.MULTILINE_TEXT: {
            if (typeof value === "string")
              filter[`profile.${key}`] = { $regex: value, $options: "im" };
            else {
              console.warn("Wrong type found, search.js");
            }
            break;
          }
          case INPUT_TYPE.EMAIL: {
            if (typeof value === "string")
              filter[`profile.${key}`] = { $regex: value, $options: "im" };
            else {
              console.warn("Wrong type found, search.js");
            }
            break;
          }
          case INPUT_TYPE.NUMBER: {
            if (typeof value === "number") filter[`profile.${key}`] = value;
            else {
              console.warn("Wrong type found, search.js");
            }
            break;
          }
        }
      }
    }
  } */

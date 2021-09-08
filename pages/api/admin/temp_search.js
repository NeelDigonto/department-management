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

  //toTypedQuerry(rawFilter);

  //res.status(200).json(rawFilter);

  // https://docs.mongodb.com/manual/reference/operator/query-comparison/
  // https://docs.mongodb.com/manual/reference/operator/query/regex/
  // https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/

  /*   {
        sort: {
          "journal-publications.title": -1,
        },
        projection: { profile: { name: 1, f_name: 1 }, "journal-publications": 1 },
      }  */

  //const payload = await usersCollection.find(filter).toArray();

  /* const sanitizedPayload = payload.map((document) => {
    let temp_obj = { ...document };
    delete temp_obj["hashedPassword"];
    delete temp_obj["_id"];
    return temp_obj;
  });
  */

  const pipeline = [
    {
      $match: {
        "profile.f_name": { $regex: "jahar dey", $options: "im" },
        "profile.m_name": { $regex: "dey", $options: "im" },
        //"profile.bld_grp": { $regex: "AB+", $options: "" },
        "profile.bld_grp": { $in: ["A+", "AB+"] },
        //"profile.dob": { $lte: new Date(2001, 11, 20) },

        "journal-publications": {
          $elemMatch: {
            title: { $regex: "integration", $options: "im" },
            author: { $regex: "saikat", $options: "im" },
            studs_involved: { $gte: 1 },
          },
        },
      },
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
  res.status(200).json(payload);

  connection.close();
}

/*
const pipeline = [
  {
    $match: filter,
  },
  {
    $project: {
      "journal-publications": {
        $filter: {
          input: "$journal-publications",
          as: "achievement",
          cond: {
            $and: [
              //{ $gte: ["$$achievement.studs_involved", 9] },
              //{ $in: ["$$achievement.studs_involved", [9]] },
              // { $lte: ["$$achievement", NumberLong("9223372036854775807")] },
            ],
            //$regexMatch: { input: "$$achievement.title", regex: "biot", options: "i" },
          },
        },
      },
    },
  },*/

/*  // projectionFilter
 projectionFilter[split_field_key[0]]["$filter"] = {
  input: `${split_field_key[0]}`,
  as: "achievement",
  cond: {
    $and: [
      // { $gte: ["$$achievement.studs_involved", 9] },
      // { $in: ["$$achievement.studs_involved", [9]] },
      { $regexMatch: { input: "$$achievement.title", regex: "biot", options: "i" } },
    ],
  },
}; */

/*   const filter = {
    "profile.name": { $regex: "Saikat Dey", $options: "im" },
    "journal-publications": {
      $elemMatch: {
        //title: { $regex: "integration", $options: "im" },
        //author: { $regex: "saikat", $options: "im" },
        studs_involved: { $gte: 1 },
      },
    },
  }; */

/*     {
      $project: display,
    }, */
/* {
      $project: {
        // profile: 1,
        "journal-publications": {
          $filter: {
            input: "$journal-publications",
            as: "achievement",
            cond: {
              $and: [
                { $gte: ["$$achievement.studs_involved", 9] },
                //{ $in: ["$$achievement.studs_involved", [9]] },
                // { $lte: ["$$achievement", NumberLong("9223372036854775807")] },
                { $regexMatch: { input: "$$achievement.title", regex: "biot", options: "i" } },
              ],
            },
          },
        },
      },
    }, */
/*  {
      $project: {
        _id: 0,
        employeeID: 1,
        "profile.name": 1,
        "profile.department": 1,
        "profile.designation": 1,
        "journal-publications.issn_isbn": 1,
      },
    }, */

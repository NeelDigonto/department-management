import contentDisposition from "content-disposition";
import { Readable } from "stream";

import { getMongoClient } from "../../../lib/db";
import { isEmptyObject } from "../../../lib/util";
import { MASTER_SCHEMA, ACHIEVEMENTS_GROUP_SCHEMA } from "../../../data/schema";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE } from "../../../data/types/types";
import {
  toTypedAchievements,
  toTypedProfile,
  getTypedDocument,
  toTypedQuerry,
} from "../../../lib/type_converter";

import { getWorkBook } from "../../../lib/workbook";

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

  const { filter, sort, display } = req.body;

  toTypedQuerry(filter);

  let projectionFilter = { profile: 1, employeeID: 1 };

  Object.keys(ACHIEVEMENTS_GROUP_SCHEMA).forEach((category) => {
    if (!!filter[category]) {
      // setup
      projectionFilter[category] = {
        $filter: { input: `$${category}`, as: "achievement", cond: { $and: [] } },
      };

      for (let [key, value] of Object.entries(filter[category]["$elemMatch"])) {
        if (!!value["$regex"]) {
          projectionFilter[category]["$filter"]["cond"]["$and"].push({
            $regexMatch: {
              input: `$$achievement.${key}`,
              regex: value["$regex"],
              options: value["$options"],
            },
          });
        }
        if (!!value["$in"]) {
          projectionFilter[category]["$filter"]["cond"]["$and"].push({
            $in: [`$$achievement.${key}`, value["$in"]],
          });
        }
        if (!!value["$lt"]) {
          projectionFilter[category]["$filter"]["cond"]["$and"].push({
            $gte: [`$$achievement.${key}`, value["$lt"]],
          });
        }
        if (!!value["$lte"]) {
          projectionFilter[category]["$filter"]["cond"]["$and"].push({
            $gte: [`$$achievement.${key}`, value["$lte"]],
          });
        }
        if (!!value["$gt"]) {
          projectionFilter[category]["$filter"]["cond"]["$and"].push({
            $gte: [`$$achievement.${key}`, value["$gt"]],
          });
        }
        if (!!value["$gte"]) {
          projectionFilter[category]["$filter"]["cond"]["$and"].push({
            $gte: [`$$achievement.${key}`, value["$gte"]],
          });
        }
        if (!!value["$eq"]) {
          projectionFilter[category]["$filter"]["cond"]["$and"].push({
            $gte: [`$$achievement.${key}`, value["$eq"]],
          });
        }
        if (!!value["$ne"]) {
          projectionFilter[category]["$filter"]["cond"]["$and"].push({
            $gte: [`$$achievement.${key}`, value["$ne"]],
          });
        }
      }
    } else {
      projectionFilter[category] = 1;
    }
  });

  const pipeline = [
    {
      $match: filter,
    },
    {
      $project: projectionFilter,
    },
    { $project: { _id: 0, employeeID: 1, ...display } },
  ];

  const payload = await usersCollection.aggregate(pipeline).toArray();
  connection.close();

  const workbook = await getWorkBook(payload, display);

  const streamFile = async (workbook) => {
    let buffer = null;
    await workbook.xlsx.writeBuffer().then((data) => {
      buffer = data;
    });

    res.status(200);
    res.setHeader("Content-Length", buffer.byteLength);
    res.setHeader(
      "Content-Disposition",
      contentDisposition("TestFile.xlsx", {
        type: "inline",
      })
    );
    res.setHeader("Content-Encoding", "7bit");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Accept-Ranges", "bytes");
    const readStream = new Readable();
    readStream._read = () => {};
    readStream.push(buffer);
    readStream.push(null);

    await new Promise(function (resolve) {
      readStream.pipe(res);
      readStream.on("end", resolve);
    });
  };

  /*   res.status(200).json({
    searchResult: payload,
    projectionFilter,
  }); */

  await streamFile(workbook);
}

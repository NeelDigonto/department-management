import contentDisposition from "content-disposition";
import { Readable } from "stream";
import { getSession } from "next-auth/client";
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from "http-status-codes";

import { getMongoClient } from "../../../../src/lib/db";
import { MASTER_SCHEMA, ACHIEVEMENTS_GROUP_SCHEMA } from "../../../../src/data/schema";
import { toTypedQuerry } from "../../../../src/lib/type_converter";

import { getWorkBookBuffer } from "../../../../src/lib/workbook";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  } else if (session.user.isAdmin !== true) {
    res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
    return;
  }

  const client = await getMongoClient();
  const connection = await client.connect();

  const usersCollection = connection.db("users").collection("faculties");

  const { filter, sort, display } = req.body;

  try {
    toTypedQuerry(filter);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    connection.close();
    return;
  }

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

  let payload;
  try {
    payload = await usersCollection.aggregate(pipeline).toArray();
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    connection.close();
    return;
  }
  connection.close();

  let workbookBuffer;
  try {
    workbookBuffer = await getWorkBookBuffer(payload, display);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }

  const streamFile = async () => {
    res.status(200);
    res.setHeader("Content-Length", workbookBuffer.byteLength);
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
    readStream.push(workbookBuffer);
    readStream.push(null);

    await new Promise(function (resolve) {
      readStream.pipe(res);
      readStream.on("end", resolve);
    });
  };

  await streamFile();
}

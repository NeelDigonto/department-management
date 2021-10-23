import contentDisposition from "content-disposition";
import { Readable } from "stream";
import { getSession } from "next-auth/client";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

import { getMongoClient } from "../../../../src/lib/db";
import {
  MASTER_SCHEMA,
  ACHIEVEMENTS_GROUP_SCHEMA,
} from "../../../../src/data/schema";
import { toTypedQuerry } from "../../../../src/lib/type_converter";

import { getWorkBookBuffer } from "../../../../src/lib/workbook";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send(ReasonPhrases.METHOD_NOT_ALLOWED);
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    connection.close();
    return;
  }

  let projectionFilter = { profile: 1 };

  Object.keys(ACHIEVEMENTS_GROUP_SCHEMA).forEach((category) => {
    if (!!filter[category]) {
      // setup
      projectionFilter[category] = {
        $filter: {
          input: `$${category}`,
          as: "achievement",
          cond: { $and: [] },
        },
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

        ["$lt", "$lte", "$gt", "$gte", "$eq", "$ne", "$in"].forEach(
          (operator) => {
            if (!!value[operator]) {
              projectionFilter[category]["$filter"]["cond"]["$and"].push({
                [operator]: [`$$achievement.${key}`, value[operator]],
              });
            }
          }
        );
      }
    } else {
      projectionFilter[category] = 1;
    }
  });

  const pipeline = [
    {
      $match: filter,
    },
    { $project: { _id: 0, ...display } },
    {
      $project: projectionFilter,
    },
  ];

  let payload;
  try {
    payload = await usersCollection.aggregate(pipeline).toArray();
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    connection.close();
    return;
  }
  connection.close();

  let workbookBuffer;
  try {
    workbookBuffer = await getWorkBookBuffer(payload, display);
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }

  const streamFile = async () => {
    res.status(200);
    res.setHeader("Content-Length", workbookBuffer.byteLength);
    res.setHeader(
      "Content-Disposition",
      contentDisposition("SelectedUserData.xlsx", {
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

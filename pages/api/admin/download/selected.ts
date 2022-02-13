import contentDisposition from "content-disposition";
import { Readable } from "stream";
import * as ExcelJS from "exceljs";
import { getSession } from "next-auth/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

import * as util from "@lib/util";
import { getMongoClient } from "@lib/db";
import * as Workbook from "@lib/workbook/workbook";
import { ACHIEVEMENTS_SCHEMA_MAP } from "@data/schema";
import { toTypedQuerry } from "@lib/type_converter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!util.assertRequestMethod(req, res, util.MethodType.POST)) return;

  const session = await getSession({ req });
  if (!util.assertIsAdmin(session, res)) return;

  const client = await getMongoClient();
  const connection = await client.connect();
  const usersCollection = connection.db("users").collection("faculties");
  const { filter, sort, display } = req.body;

  if (
    !util.assertTry(
      () => toTypedQuerry(filter),
      () => connection.close(),
      res
    )
  )
    return;

  let projectionFilter = { profile: 1 };
  const display_with_profile = { ...display };
  Object.entries(display).forEach(([_key, _entry]) => {
    if (String(_key).startsWith("profile")) delete display_with_profile[_key];
  });
  display_with_profile["profile"] = 1;

  ACHIEVEMENTS_SCHEMA_MAP.forEach((_, category: string) => {
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
    { $project: { _id: 0, ...display_with_profile } },
    {
      $project: projectionFilter,
    },
  ];

  let collectionData;
  try {
    collectionData = await usersCollection.aggregate(pipeline).toArray();
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    connection.close();
    return;
  }

  connection.close();

  let workbookBuffer: ExcelJS.Buffer;
  try {
    const workbook: ExcelJS.Workbook = Workbook.getWorkBook(
      Workbook.WorkbookType.All,
      collectionData,
      true,
      display
    );
    workbookBuffer = await Workbook.getWorkBookBuffer(workbook);
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }

  await Workbook.streamFile(workbookBuffer, res);
}

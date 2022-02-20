import contentDisposition from "content-disposition";
import { Readable } from "stream";
import * as ExcelJS from "exceljs";
import { getSession } from "next-auth/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Document, Packer, Paragraph, TextRun } from "docx";
import type { NextApiRequest, NextApiResponse } from "next";

import * as util from "@lib/util";
import { getMongoClient } from "@lib/db";
import * as Workbook from "@lib/workbook/excel/workbook";
import { ACHIEVEMENTS_SCHEMA_MAP } from "@data/schema";
import { toTypedQuerry } from "@lib/type_converter";
import * as word from "@src/lib/workbook/word/word";

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

  let display_with_profile = util.generateDisplayWithProfile(display);
  let projectionFilter = util.generateProjectionFilter(display, filter);

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

  let workbookBuffer: Buffer;
  try {
    const workbook: Document = word.getWordFile(
      collectionData,
      "selected",
      display,
      "seminar-attended"
    );
    workbookBuffer = await word.getWorkBookBuffer(workbook);
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }

  await word.streamFile(workbookBuffer, res);
}

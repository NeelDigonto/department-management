import { getSession } from "next-auth/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import * as ExcelJS from "exceljs";
import type { NextApiRequest, NextApiResponse } from "next";

import * as util from "@lib/util";
import { getMongoClient } from "@lib/db";
import * as Workbook from "@lib/workbook/excel/workbook";
import all_t from "../all_t.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!util.assertRequestMethod(req, res, util.MethodType.GET)) return;

  const session = await getSession({ req });
  if (!util.assertIsAdmin(session, res)) return;

  let collectionData: any;

  const client = await getMongoClient();
  const connection = await client.connect();
  const usersCollection = connection.db("users").collection("faculties");

  try {
    collectionData = await usersCollection.find().toArray();
  } catch (err) {
    console.error(err);
  }
  connection.close();

  //collectionData = all_t;

  let workbookBuffer: ExcelJS.Buffer;
  try {
    const workbook: ExcelJS.Workbook = Workbook.getWorkBook(
      collectionData,
      "all",
      {}
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

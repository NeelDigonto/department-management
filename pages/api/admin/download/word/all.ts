import { getSession } from "next-auth/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";
import { Document, Packer, Paragraph, TextRun } from "docx";

import * as util from "@lib/util";
import { getMongoClient } from "@lib/db";
import all_t from "../all_t.json";
import * as word from "@src/lib/workbook/word/word";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!util.assertRequestMethod(req, res, util.MethodType.GET)) return;

  const session = await getSession({ req });
  if (!util.assertIsAdmin(session, res)) return;

  let collectionData = all_t;
  let workbookBuffer: Buffer;
  try {
    const workbook: Document = word.getWorkBook(collectionData, "all", {});
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

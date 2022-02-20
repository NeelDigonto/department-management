import { getSession } from "next-auth/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";
import { Document, Packer, Paragraph, TextRun } from "docx";

import * as util from "@lib/util";
import { getMongoClient } from "@lib/db";
import all_t from "../all_t.json";
import * as word from "@src/lib/workbook/word/word";

import fs from "fs";
import archiver from "archiver";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /*   if (!util.assertRequestMethod(req, res, util.MethodType.GET)) return;

  const session = await getSession({ req });
  if (!util.assertIsAdmin(session, res)) return; */

  var output = fs.createWriteStream("./example.zip");
  var archive = archiver("zip", {
    gzip: true,
    zlib: { level: 9 }, // Sets the compression level.
  });

  archive.on("error", function (err) {
    throw err;
  });

  // pipe archive data to the output file
  archive.pipe(output);

  // append files
  archive.file("./pages/api/admin/download/word/test1.docx", {
    name: "test1.docx",
  });
  archive.file("./pages/api/admin/download/word/test2.xlsx", {
    name: "test2.xlsx",
  });

  //
  archive.finalize();

  res.send(200);
}

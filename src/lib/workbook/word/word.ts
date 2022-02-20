import * as ExcelJS from "exceljs";
import type { NextApiRequest, NextApiResponse } from "next";
import contentDisposition from "content-disposition";
import { Readable } from "stream";
import Mime from "mime/Mime";
import { ACHIEVEMENTS_SCHEMA_MAP } from "@data/schema";
import { SchemaType, FieldType } from "@data/schemas/types";

import * as fs from "fs";
import * as docx from "docx"; // * as or it will crash
import { getDbFdMaps, setupAllDisplayObject } from "../util";
import { getSections } from "./helper";

//       "seminar-attended"

/* function getWordFiles(
  _collectionData: any,
  _type: "selected" | "all",
  _display: Object
) {
  const results;
  ACHIEVEMENTS_SCHEMA_MAP.forEach((_value: SchemaType, _key: string) => {
    results = getWorkBook(_collectionData, _key, _display);
  });
} */

function getWordFile(
  _collectionData: any,
  _type: "selected" | "all",
  _display: Object,
  _key: string
): docx.Document {
  const display: Object = setupAllDisplayObject(_display, _type);

  //move it higher
  const [prof_db_fld_pr, achv_db_fld_pr]: [
    Map<string, FieldType>,
    Map<string, FieldType>
  ] = getDbFdMaps(_key, display);

  const doc = new docx.Document({
    creator: "BSH Website",
    description: "My extremely interesting document",
    title: "My Document",
    sections: getSections(_collectionData, _key, display, achv_db_fld_pr),
  });

  return doc;
}

async function getWorkBookBuffer(workbook: docx.Document): Promise<Buffer> {
  return await docx.Packer.toBuffer(workbook);
}

async function streamFile(
  workbookBuffer: Buffer,
  res: NextApiResponse
): Promise<void> {
  res.status(200);
  res.setHeader("Content-Length", workbookBuffer.byteLength);
  res.setHeader(
    "Content-Disposition",
    contentDisposition("SelectedUserData.docx", {
      type: "inline",
    })
  );
  res.setHeader("Content-Encoding", "7bit");
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
}

export { getWordFile, getWorkBookBuffer, streamFile };

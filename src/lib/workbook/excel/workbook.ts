import * as ExcelJS from "exceljs";
import type { NextApiRequest, NextApiResponse } from "next";
import contentDisposition from "content-disposition";
import { Readable } from "stream";

import {
  getStandardWorkBook,
  getColumnWidth,
  rowHeight,
  setupAllDisplayObject,
} from "../util";
import { setupProfileSheet } from "./profileSheet";
import { setupAchievementSheets } from "./achievementSheets";
import { ACHIEVEMENTS_SCHEMA_MAP } from "@data/schema";
import { SchemaType, FieldType } from "@data/schemas/types";

function getWorkBook(
  _collectionData: any,
  _type: "selected" | "all" = "selected",
  _display: Object
): ExcelJS.Workbook {
  const workbook: ExcelJS.Workbook = getStandardWorkBook();

  const display: Object = setupAllDisplayObject(_display, _type);

  setupProfileSheet(workbook, _collectionData);
  setupAchievementSheets(workbook, _collectionData, display);

  return workbook;
}

async function getWorkBookBuffer(
  workbook: ExcelJS.Workbook
): Promise<ExcelJS.Buffer> {
  return await workbook.xlsx.writeBuffer();
}

async function streamFile(
  workbookBuffer: ExcelJS.Buffer,
  res: NextApiResponse
): Promise<void> {
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
}

export { getWorkBook, getWorkBookBuffer, streamFile };

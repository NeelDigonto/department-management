import * as ExcelJS from "exceljs";
import type { NextApiRequest, NextApiResponse } from "next";
import contentDisposition from "content-disposition";
import { Readable } from "stream";

import { getStandardWorkBook, getColumnWidth, rowHeight } from "./util";
import { setupProfileSheet } from "./profileSheet";
import { setupAchievementSheets } from "./achievementSheets";
import { ACHIEVEMENTS_SCHEMA_MAP, MASTER_SCHEMA } from "../../data/schema";
import { SchemaType, FieldType } from "../../data/schemas/types";

enum WorkbookType {
  All,
  Selected,
}

function getWorkBook(
  _workbookType: WorkbookType,
  _collectionData: any,
  _isOnlySelected: any = true,
  _display: Object = {}
): ExcelJS.Workbook {
  const workbook: ExcelJS.Workbook = getStandardWorkBook();

  if (!_isOnlySelected) {
    _display = { "profile.name": 1 };

    ACHIEVEMENTS_SCHEMA_MAP.forEach((_schema: SchemaType) => {
      _schema.fields.forEach(
        (_field: FieldType) =>
          (_display[`${_schema.key}.${_field.db_field}`] = 1)
      );
    });
  }

  setupProfileSheet(workbook, _collectionData);
  setupAchievementSheets(workbook, _collectionData, _display);

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

export { getWorkBook, getWorkBookBuffer, WorkbookType, streamFile };

import * as ExcelJS from "exceljs";
import process from "process";
import {
  VALUE_TYPE,
  INPUT_TYPE,
  DB_FIELD_TYPE,
  WIDTH_TYPE,
} from "@data/types/types";
import Cell from "@lib/Cell";
import * as Constants from "@lib/Constants";

function getStandardWorkBook(): ExcelJS.Workbook {
  const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();

  workbook.creator = Constants.APP_NAME;
  workbook.lastModifiedBy = Constants.APP_NAME;
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  workbook.calcProperties.fullCalcOnLoad = true;
  return workbook;
}

function getColumnWidth(view_width: WIDTH_TYPE) {
  switch (view_width) {
    case WIDTH_TYPE.SMALL:
      return 20;
    case WIDTH_TYPE.MEDIUM:
      return 30;
    case WIDTH_TYPE.LARGE:
      return 40;
    default:
      return 20;
  }
}
const rowHeight: number = 50;

export { getStandardWorkBook, getColumnWidth, rowHeight };

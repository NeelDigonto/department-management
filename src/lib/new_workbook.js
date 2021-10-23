import * as ExcelJS from "exceljs";

import { ACHIEVEMENTS_GROUP_SCHEMA, MASTER_SCHEMA } from "../data/schema";
import { isEmptyObject } from "../lib/util";
import {
  VALUE_TYPE,
  INPUT_TYPE,
  DB_FIELD_TYPE,
  WIDTH_TYPE,
} from "../data/types/types";
import Cell from "../lib/Cell";

const getColumnWidth = (view_width) => {
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
};
const rowHeight = 50;

const getWorkBookBuffer = async (collectionData, display) => {
  const workbook = getWorkBook(collectionData, display);

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

const getStandardWorkBook = () => {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "IEM FACULTY BOOK";
  workbook.lastModifiedBy = "IEM FACULTY BOOK";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  workbook.calcProperties.fullCalcOnLoad = true;
  return workbook;
};

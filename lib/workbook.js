import * as ExcelJS from "exceljs";

import { ACHIEVEMENTS_GROUP_SCHEMA, MASTER_SCHEMA, sidebarOptions } from "../data/schema";
import { isEmptyObject } from "../lib/util";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE, WIDTH_TYPE } from "../data/types/types";
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

function getWorkBook(collectionData, display) {
  let displayObject = {};
  for (let [key, value] of Object.entries(display)) {
    const split_key = key.split(".");
    if (!displayObject[split_key[0]]) displayObject[split_key[0]] = {};
    displayObject[split_key[0]][split_key[1]] = true;
  }

  const getStandardWorkBook = () => {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Saikat Dey";
    workbook.lastModifiedBy = "Nobody";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    workbook.calcProperties.fullCalcOnLoad = true;
    return workbook;
  };

  const workbook = getStandardWorkBook();
  const worksheet = workbook.addWorksheet("DataSheet");

  const setupHeaders = () => {
    let ws_columns_hot = [
      {
        header: "Profile",
        key: "profile",
        width: collectionData[0]["employeeID"].length + 3,
      },
    ];

    MASTER_SCHEMA["profile"].forEach((field, index) => {
      if (!!displayObject["profile"] && displayObject["profile"][field.db_field])
        ws_columns_hot.push({
          width: getColumnWidth(field.view_width),
        });
    });

    const employeeID_cell = worksheet.getCell("A2");
    employeeID_cell.value = "ID's";
    employeeID_cell.alignment = { horizontal: "center", vertical: "middle" };

    const iter_cell = new Cell("B", 2);
    const mergeStartCell = new Cell("A", 1);
    //const mergeEndCell = new Cell("A", 1);

    MASTER_SCHEMA["profile"].forEach((field, index) => {
      if (!!displayObject["profile"][field.db_field]) {
        const cell = worksheet.getCell(iter_cell.getString());
        cell.value = field.label;
        cell.alignment = { horizontal: "center", vertical: "middle" };

        iter_cell.column += 1;
      }
    });

    worksheet.mergeCells(
      `A1:${new Cell(Cell.convertColumnToNumber("A") + iter_cell.column - 1, 1).getString()}`
    );

    /*   for (let [key, value] of Object.entries(ACHIEVEMENTS_GROUP_SCHEMA)) {
      if (!!displayObject[key]) {
      }
      ACHIEVEMENTS_GROUP_SCHEMA[key].forEach(() => {});
    }
 */
    worksheet.columns = ws_columns_hot;
  };

  setupHeaders();

  return workbook;
}

export { getWorkBook };

import * as ExcelJS from "exceljs";
import * as Constants from "../../lib/Constants";
import { MASTER_SCHEMA } from "../../data/schema";
import { getColumnWidth } from "./util";
import Cell from "../Cell";
import { FieldType } from "../../data/schemas/types";

function setupHeaders(_worksheet: ExcelJS.Worksheet): void {
  let ws_columns_hot: Partial<ExcelJS.Column>[] = [
    {
      header: "Profile",
      key: "profile",
      width: getColumnWidth(MASTER_SCHEMA.profile[0].view_width),
    },
  ];
  for (let i = 1; i < MASTER_SCHEMA.profile.length; ++i) {
    ws_columns_hot.push({
      width: getColumnWidth(MASTER_SCHEMA.profile[i].view_width),
    });
  }
  _worksheet.columns = ws_columns_hot;

  const iter_cell: Cell = new Cell("A", 2);
  MASTER_SCHEMA.profile.forEach((field: FieldType) => {
    const cell = _worksheet.getCell(iter_cell.toString());
    iter_cell.column += 1;
    cell.value = field.label;
    cell.alignment = { horizontal: "center", vertical: "middle" };
  });

  const mergeUptoCell: Cell = new Cell("A", 1);
  mergeUptoCell.column += MASTER_SCHEMA.profile.length - 1;
  _worksheet.mergeCells(`A1:${mergeUptoCell.toString()}`);
  _worksheet.getCell("A1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };
}

function setupDataRows(
  _worksheet: ExcelJS.Worksheet,
  _collectionData: any
): void {
  for (let userNo: number = 0; userNo < _collectionData.length; ++userNo) {
    const cell_iter: Cell = new Cell("A", 3 + userNo);
    MASTER_SCHEMA.profile.forEach((field: FieldType) => {
      const current_cell: ExcelJS.Cell = _worksheet.getCell(
        cell_iter.toString()
      );
      const value = _collectionData[userNo]["profile"][field.db_field];
      current_cell.value = !!value ? value : null;

      cell_iter.column += 1;
    });
  }
}

function setupProfileSheet(_workbook: ExcelJS.Workbook, _collectionData): void {
  const worksheet = _workbook.addWorksheet(Constants.PROFILE_SHEET_NAME);
  setupHeaders(worksheet);
  setupDataRows(worksheet, _collectionData);
}

export { setupProfileSheet };

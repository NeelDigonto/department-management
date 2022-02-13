import * as ExcelJS from "exceljs";
import { MASTER_SCHEMA, ACHIEVEMENTS_SCHEMA_MAP } from "@data/schema";
import { getColumnWidth } from "./util";
import Cell from "@lib/Cell";
import { FieldType, SchemaType } from "@data/schemas/types";
import { getFormatedValue } from "./lib";

function setupAchievementHeaders(
  _worksheet: ExcelJS.Worksheet,
  _key: string,
  _display: Object,
  prof_db_fld_pr: Map<string, FieldType>,
  achv_db_fld_pr: Map<string, FieldType>
): void {
  const schema: SchemaType = ACHIEVEMENTS_SCHEMA_MAP.get(_key);

  //Primary Headers
  let ws_columns_hot: Partial<ExcelJS.Column>[] = [];

  if (prof_db_fld_pr.size !== 0) {
    prof_db_fld_pr.forEach((_field) => {
      ws_columns_hot.push({
        width: getColumnWidth(_field.view_width),
      });
    });

    ws_columns_hot[0].header = "Profile";
    ws_columns_hot[0].key = "profile";

    // Primary Header Merging
    _worksheet.mergeCells(`A1:${new Cell(prof_db_fld_pr.size, 1).toString()}`);
    _worksheet.getCell("A1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };
  }

  if (achv_db_fld_pr.size !== 0) {
    achv_db_fld_pr.forEach((_field) => {
      ws_columns_hot.push({
        width: getColumnWidth(_field.view_width),
      });
    });

    ws_columns_hot[prof_db_fld_pr.size].header = schema.diplay_name;
    ws_columns_hot[prof_db_fld_pr.size].key = schema.id;

    // Primary Header Merging
    _worksheet.mergeCells(
      `${new Cell(prof_db_fld_pr.size + 1, 1).toString()}:${new Cell(
        prof_db_fld_pr.size + achv_db_fld_pr.size,
        1
      ).toString()}`
    );
    _worksheet.getCell(
      new Cell(prof_db_fld_pr.size + 1, 1).toString()
    ).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
  }

  _worksheet.columns = ws_columns_hot;

  //Secondary Headers
  const iter_cell: Cell = new Cell("A", 2);
  prof_db_fld_pr.forEach((_field) => {
    const cell = _worksheet.getCell(iter_cell.toString());
    cell.value = _field.label;
    cell.alignment = { horizontal: "center", vertical: "middle" };

    iter_cell.column += 1;
  });

  achv_db_fld_pr.forEach((_field) => {
    const cell = _worksheet.getCell(iter_cell.toString());
    cell.value = _field.label;
    cell.alignment = { horizontal: "center", vertical: "middle" };

    iter_cell.column += 1;
  });
}

function setupAchievementDataRows(
  _worksheet: ExcelJS.Worksheet,
  _collectionData: any,
  _key: string,
  _display: Object,
  prof_db_fld_pr: Map<string, FieldType>,
  achv_db_fld_pr: Map<string, FieldType>
): void {
  let data_rows_written: number = 0;

  for (let userNo: number = 0; userNo < _collectionData.length; ++userNo) {
    const user_prof: any = _collectionData[userNo]["profile"];
    const user_achv: any[] = _collectionData[userNo][_key];

    if (!!user_achv && user_achv.length !== 0) {
      user_achv.forEach((_user_data_row) => {
        const cell_iter: Cell = new Cell("A", 3 + data_rows_written);

        if (prof_db_fld_pr.size !== 0 && achv_db_fld_pr.size !== 0) {
          //print profile
          prof_db_fld_pr.forEach((_, _db_field_name: string) => {
            const current_cell: ExcelJS.Cell = _worksheet.getCell(
              cell_iter.toString()
            );
            current_cell.value = user_prof[_db_field_name];
            cell_iter.column++;
          });

          //now print achievement
          achv_db_fld_pr.forEach((_, _db_field_name: string) => {
            const current_cell: ExcelJS.Cell = _worksheet.getCell(
              cell_iter.toString()
            );
            current_cell.value = _user_data_row[_db_field_name];
            cell_iter.column++;
          });
        }

        data_rows_written++;
      });
    }
  }
}

function getDbFdMaps(
  _key: string,
  _display: Object
): [Map<string, FieldType>, Map<string, FieldType>] {
  // count profile fields
  const prof_db_fld_pr: Map<string, FieldType> = new Map<string, FieldType>();
  const achv_db_fld_pr: Map<string, FieldType> = new Map<string, FieldType>();
  const achv_schema = ACHIEVEMENTS_SCHEMA_MAP.get(_key);

  MASTER_SCHEMA.profile.forEach((_field, _index) => {
    const db_field_name: string = _field.db_field;

    if (!!_display[`profile.${db_field_name}`]) {
      prof_db_fld_pr.set(db_field_name, _field);
    }
  });

  achv_schema.fields.forEach((_field, _index) => {
    const db_field_name: string = _field.db_field;

    if (!!_display[`${achv_schema.key}.${db_field_name}`]) {
      achv_db_fld_pr.set(db_field_name, _field);
    }
  });

  return [prof_db_fld_pr, achv_db_fld_pr];
}

function setupAchievementSheet(
  _workbook: ExcelJS.Workbook,
  _collectionData: any,
  _key: string,
  _display: Object
): void {
  const [prof_db_fld_pr, achv_db_fld_pr]: [
    Map<string, FieldType>,
    Map<string, FieldType>
  ] = getDbFdMaps(_key, _display);

  if (achv_db_fld_pr.size === 0) return;

  const worksheet = _workbook.addWorksheet(_key);

  setupAchievementHeaders(
    worksheet,
    _key,
    _display,
    prof_db_fld_pr,
    achv_db_fld_pr
  );
  setupAchievementDataRows(
    worksheet,
    _collectionData,
    _key,
    _display,
    prof_db_fld_pr,
    achv_db_fld_pr
  );
}

function setupAchievementSheets(
  _workbook: ExcelJS.Workbook,
  _collectionData: any,
  _display: Object
): void {
  ACHIEVEMENTS_SCHEMA_MAP.forEach((_value: SchemaType, _key: string) => {
    setupAchievementSheet(_workbook, _collectionData, _key, _display);
  });
}

export { setupAchievementSheets };

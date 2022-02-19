import * as ExcelJS from "exceljs";
import process from "process";
import * as docx from "docx"; // * as or it will crash
import {
  VALUE_TYPE,
  INPUT_TYPE,
  DB_FIELD_TYPE,
  WIDTH_TYPE,
} from "@data/types/types";
import Cell from "@lib/Cell";
import * as Constants from "@lib/Constants";
import { FieldType, SchemaType } from "@src/data/schemas/types";
import { ACHIEVEMENTS_SCHEMA_MAP, MASTER_SCHEMA } from "@src/data/schema";

function getExcelFormatedValue(
  _value: any,
  _input_type: INPUT_TYPE
): ExcelJS.CellValue {
  if (_input_type === INPUT_TYPE.FILE) {
    if (_value.isLink) {
      return _value.flink;
    } else {
      const link: string = `${Constants.APP_SITE_BASE_URL}api/file/get/${_value.fname}fuid`;
      return {
        text: _value.fname,
        hyperlink: link,
      };
    }
  } else {
    return getBasicFormatedValue(_value, _input_type);
  }
}

function getWordFormatedValue(
  _value: any,
  _input_type: INPUT_TYPE
): docx.ParagraphChild {
  if (_input_type === INPUT_TYPE.FILE) {
    const link: string = _value.isLink
      ? _value.flink
      : `${Constants.APP_SITE_BASE_URL}api/file/get/${_value.fuid}`;

    return new docx.ExternalHyperlink({
      children: [
        new docx.TextRun({
          text: link,
          style: "Hyperlink",
          size: 24,
        }),
      ],
      link: link,
    });
  } else {
    return new docx.TextRun({
      text: getBasicFormatedValue(_value, _input_type),
      bold: true,
      size: 24,
    });
  }
}

function getBasicFormatedValue(_value: any, _input_type: INPUT_TYPE): string {
  if (_value === null || _value === undefined) return "";

  switch (_input_type) {
    case INPUT_TYPE.TEXT:
    case INPUT_TYPE.MULTILINE_TEXT:
    case INPUT_TYPE.SELECT:
    case INPUT_TYPE.CUSTOM_SELECT:
    case INPUT_TYPE.EMAIL:
    case INPUT_TYPE.NUMBER:
      return String(_value);

    case INPUT_TYPE.CHECKBOX:
      return _value ? "YES" : "NO";

    case INPUT_TYPE.DATE:
      return new Date(_value as string).toUTCString();

    default:
      return "";
  }
}

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

function setupAllDisplayObject(
  _display: any,
  _type: "selected" | "all"
): Object {
  if (_type === "all") {
    _display = { "profile.name": 1 };

    ACHIEVEMENTS_SCHEMA_MAP.forEach((_schema: SchemaType) => {
      _schema.fields.forEach(
        (_field: FieldType) =>
          (_display[`${_schema.key}.${_field.db_field}`] = 1)
      );
    });
  }
  return _display;
}

const rowHeight: number = 50;

export {
  getBasicFormatedValue,
  getExcelFormatedValue,
  getWordFormatedValue,
  getStandardWorkBook,
  getColumnWidth,
  rowHeight,
  getDbFdMaps,
  setupAllDisplayObject,
};

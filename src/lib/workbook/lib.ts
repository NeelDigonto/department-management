import * as ExcelJS from "exceljs";
import * as Constants from "@lib/Constants";
import { DB_FIELD_TYPE, VALUE_TYPE, INPUT_TYPE } from "@data/types/types";

function getFormatedValue(
  _value: any,
  _input_type: INPUT_TYPE
): ExcelJS.CellValue {
  if (_value === null || _value === undefined) return "";

  switch (_input_type) {
    case INPUT_TYPE.TEXT ||
      INPUT_TYPE.MULTILINE_TEXT ||
      INPUT_TYPE.SELECT ||
      INPUT_TYPE.CUSTOM_SELECT ||
      INPUT_TYPE.EMAIL ||
      INPUT_TYPE.NUMBER:
      return _value;
    case INPUT_TYPE.CHECKBOX: {
      if (_value) return "YES";
      else return "NO";
    }
    case INPUT_TYPE.DATE:
      return new Date(_value as string).toUTCString();
    case INPUT_TYPE.FILE: {
      if (_value.isLink) {
        return _value.flink;
      } else {
        const link: string = `${Constants.APP_SITE_BASE_URL}api/file/get/${_value.fname}fuid`;
        return {
          text: _value.fname,
          hyperlink: link,
        };
      }
    }
  }

  return "";
}

export { getFormatedValue };

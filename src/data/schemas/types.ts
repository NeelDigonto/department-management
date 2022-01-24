import {
  DB_FIELD_TYPE,
  INPUT_TYPE,
  VALUE_TYPE,
  WIDTH_TYPE,
} from "../types/types";
//import * as Validation from "../validation/schemas";

export interface FieldType {
  label: string;
  value: string | Date | number | Object;
  info: string;
  type: VALUE_TYPE;
  db_field_type: DB_FIELD_TYPE;
  input_type: INPUT_TYPE;
  view_width: WIDTH_TYPE;
  db_field: string;
  validation: any;

  options?: string[];
  input_range?: string;
}

export interface SchemaType {
  id: string;
  last_modified: string;
  diplay_name: string;
  key: string;
  icon: any;
  fields: FieldType[];
  display_title: string;
  display_date: string;
  isCentral: boolean;
}

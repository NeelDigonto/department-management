import * as Yup from "yup";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import {
  VALUE_TYPE,
  INPUT_TYPE,
  DB_FIELD_TYPE,
  WIDTH_TYPE,
} from "@data/types/types";
import * as Validation from "@data/validation/schemas";
import { FieldType, SchemaType } from "./types";

const FIELDS: FieldType[] = [
  {
    label: "Date ",
    value: new Date().toISOString(),
    info: "Date ",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "date",
    validation: Validation.date(),
  },
  {
    label: "Collaborative Agency",
    value: "",
    info: "Collaborative Agency",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "collab_agency",
    validation: Validation.string(),
  },
  {
    label: "Duration",
    value: "",
    info: "Duration",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "duration",
    validation: Validation.string(),
  },
  {
    label: "Coverage",
    value: "",
    info: "National/ International",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.SELECT,
    view_width: WIDTH_TYPE.MEDIUM,
    options: ["National", "International"],
    db_field: "coverage",
    validation: Validation.option(),
  },
  {
    label: "Designation/Activity",
    value: "",
    info: "Designation/Activity (In collaborations)",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.MULTILINE_TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "activity",
    validation: Validation.string(),
  },
  {
    label: "Proof",
    value: {},
    info: "Proof of seminar organized",
    type: VALUE_TYPE.OBJECT,
    input_type: INPUT_TYPE.FILE,
    db_field_type: DB_FIELD_TYPE.OBJECT,
    view_width: WIDTH_TYPE.LARGE,
    input_range: "application/pdf",
    db_field: "proof",
    validation: Validation.file(),
  },
];

const SCHEMA: SchemaType = {
  id: "",
  last_modified: new Date().toISOString(),
  diplay_name: "Collaborations",
  key: "collaborations",
  icon: <GroupOutlinedIcon />,
  fields: FIELDS,
  display_title: "colab_agency",
  display_date: "date",
  isCentral: false,
};

function getValidationSchema() {
  let validationSchema = {};
  FIELDS.forEach((field) => {
    validationSchema[field.db_field] = field.validation;
  });
  return Yup.object().shape(validationSchema);
}

export { FIELDS, SCHEMA, getValidationSchema };

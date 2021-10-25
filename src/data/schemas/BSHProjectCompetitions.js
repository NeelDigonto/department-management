import * as Yup from "yup";
import BarChartIcon from "@mui/icons-material/BarChart";

import {
  VALUE_TYPE,
  INPUT_TYPE,
  DB_FIELD_TYPE,
  WIDTH_TYPE,
} from "../types/types";
import Validation from "../validation/schemas";

const FIELDS = [
  {
    label: "Project Start Date",
    value: new Date().toISOString(),
    info: "Date of Project (From)",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "event_start_date",
    validation: Validation.date(),
  },
  {
    label: "Project End Date",
    value: new Date().toISOString(),
    info: "Date of Project (End)",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "event_end_date",
    validation: Validation.date(),
  },
  {
    label: "Total Number of the projects",
    value: 0,
    info: "Total Number of the projects",
    type: VALUE_TYPE.NUMBER,
    input_type: INPUT_TYPE.NUMBER,
    db_field_type: DB_FIELD_TYPE.INT32,
    view_width: WIDTH_TYPE.SMALL,
    db_field: "proj_nos",
    validation: Validation.number(),
  },
  {
    label: "Name of the Project",
    value: "",
    info: "Name of the Project",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "proj_name",
    validation: Validation.string(),
  },
  {
    label: "Project Type",
    value: "",
    info: "Type of the Project",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "proj_type",
    validation: Validation.string(),
  },
  {
    label: "Students Participated",
    value: "",
    info: "Name of the Students Participated in the project",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.MULTILINE_TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "studs_participated",
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

const SCHEMA = {
  id: "",
  last_modified: new Date().toISOString(),
  diplay_name: "BSH Project Competitions",
  key: "bsh-project-competitions",
  icon: <BarChartIcon />,
  fields: FIELDS,
  display_title: "proj_name",
  display_date: "event_start_date",
};

const getValidationSchema = () => {
  let validationSchema = {};
  FIELDS.forEach((field) => {
    validationSchema[field.db_field] = field.validation;
  });
  return Yup.object().shape(validationSchema);
};

export { FIELDS, SCHEMA, getValidationSchema };

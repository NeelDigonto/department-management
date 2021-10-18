import * as Yup from "yup";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import {
  VALUE_TYPE,
  INPUT_TYPE,
  DB_FIELD_TYPE,
  WIDTH_TYPE,
} from "../types/types";
import Validation from "../validation/schemas";

const FIELDS = [
  {
    label: "Seminar Title",
    value: "",
    info: "Title of the Seminar",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.LARGE,
    db_field: "title",
    validation: Validation.string(),
  },
  {
    label: "Roll",
    value: 0,
    info: "Roll No. of the student",
    type: VALUE_TYPE.NUMBER,
    db_field_type: DB_FIELD_TYPE.INT32,
    input_type: INPUT_TYPE.NUMBER,
    view_width: WIDTH_TYPE.LARGE,
    db_field: "roll",
    validation: Validation.number(),
  },
  {
    label: "Section",
    value: "",
    info: "Section",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.SELECT,
    view_width: WIDTH_TYPE.MEDIUM,
    options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
    db_field: "section",
    validation: Validation.option(),
  },
  {
    label: "Mobile Number",
    value: "",
    info: "Your mobile number for reveiving SMS",
    type: VALUE_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    db_field_type: DB_FIELD_TYPE.STRING,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "mobile_no",
    validation: Validation.string(true, 10, 18),
  },
  {
    label: "Name of Company / Institute",
    value: "",
    info: "Name of Company / Institute",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.LARGE,
    db_field: "company_name",
    validation: Validation.string(),
  },
  {
    label: "Tenure ( in months)",
    value: "",
    info: "Tenure ( in months)",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.LARGE,
    db_field: "tenure",
    validation: Validation.string(),
  },
  {
    label: "Intership Start Date",
    value: new Date().toISOString(),
    info: "Date of Intership (From)",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "intern_start_date",
    validation: Validation.date(),
  },
  {
    label: "Intership End Date",
    value: new Date().toISOString(),
    info: "Date of Intership (End)",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "intern_end_date",
    validation: Validation.date(),
  },
  {
    label: "Domain of Project",
    value: "",
    info: "Domain of Project",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.CUSTOM_SELECT,
    view_width: WIDTH_TYPE.MEDIUM,
    options: ["Data analysis", "Web Development", "Testing", "Research"],
    db_field: "domain",
    validation: Validation.string(),
  },
  {
    label: "Tools / software / Programming Languages worked on",
    value: "",
    info: "Tools / software / Programming Languages worked on",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.LARGE,
    db_field: "tools_used",
    validation: Validation.string(),
  },
  {
    label: "Internship Certificate Link",
    value: "",
    info: "Internship Certificate Link",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.LARGE,
    db_field: "intern_cert",
    validation: Validation.url(),
  },
];

const SCHEMA = {
  id: "",
  last_modified: new Date().toISOString(),
  diplay_name: "Intership  Details",
  key: "intership-details",
  icon: <LocalLibraryIcon />,
  fields: FIELDS,
};

const getValidationSchema = () => {
  let validationSchema = {};
  FIELDS.forEach((field) => {
    validationSchema[field.db_field] = field.validation;
  });
  return Yup.object().shape(validationSchema);
};

export { FIELDS, SCHEMA, getValidationSchema };

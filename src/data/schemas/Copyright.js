import * as Yup from "yup";
import CopyrightIcon from "@material-ui/icons/Copyright";

import {
  VALUE_TYPE,
  INPUT_TYPE,
  DB_FIELD_TYPE,
  WIDTH_TYPE,
} from "../types/types";
import Validation from "../validation/schemas";

const FIELDS = [
  {
    label: "Copyright Title",
    value: "",
    info: "Title or name of the Copyright",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.LARGE,
    db_field: "title",
    validation: Validation.string(),
  },
  {
    label: "Copyright Details",
    value: "",
    info: "Details of the Copyright",
    type: VALUE_TYPE.STRING,
    input_type: INPUT_TYPE.MULTILINE_TEXT,
    db_field_type: DB_FIELD_TYPE.STRING,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "copyright_details",
    validation: Validation.string(),
  },
  {
    label: "Registration No.",
    value: "",
    info: "Registration Number of the Copyright",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.SMALL,
    db_field: "reg_no",
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
    db_field: "nat_inter_imp",
    validation: Validation.option(),
  },
  {
    label: "Published on",
    value: new Date().toISOString(),
    info: "Publication date of the Copyright",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "pub_on",
    validation: Validation.date(),
  },
  {
    label: "Proof",
    value: {},
    info: "Proof (Put drive link filing proof)",
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
  key: "copyrights",
  diplay_name: "Copyright",
  icon: <CopyrightIcon />,
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

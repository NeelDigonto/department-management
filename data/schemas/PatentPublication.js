import * as Yup from "yup";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE, WIDTH_TYPE } from "../types/types";
import Validation from "../validation/schemas";

const FIELDS = [
  {
    label: "Patent Title",
    value: "",
    info: "Title or name of the patent",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.LARGE,
    db_field: "title",
    validation: Validation.string(),
  },
  {
    label: "Faculty Name",
    value: "",
    info: "Name of the Faculty",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "fac_name",
    validation: Validation.string(),
  },
  {
    label: "Department",
    value: "",
    info: "Department",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.SELECT,
    view_width: WIDTH_TYPE.MEDIUM,
    options: ["Department of Basic Science and Humanities"],
    db_field: "department",
    validation: Validation.option(),
  },
  {
    label: "Patent Details",
    value: "",
    info: "Details of the patent",
    type: VALUE_TYPE.STRING,
    input_type: INPUT_TYPE.MULTILINE_TEXT,
    db_field_type: DB_FIELD_TYPE.STRING,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "pat_details",
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
    label: "Patent Application Number",
    value: "",
    info: "Patent Application Number",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "pat_app_num",
    validation: Validation.option(),
  },
  {
    label: "Date of patent filing",
    value: new Date().toISOString(),
    info: "Date of patent filing",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "pat_fil_date",
    validation: Validation.date(),
  },
  {
    label: "Publication Date",
    value: new Date().toISOString(),
    info: "Date of patent publication",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "pub_date",
    validation: Validation.date(),
  },
  {
    label: "Proof of Patent publication",
    value: {},
    info: "Proof of Patent publication (if Published)",
    type: VALUE_TYPE.OBJECT,
    input_type: INPUT_TYPE.FILE,
    db_field_type: DB_FIELD_TYPE.OBJECT,
    view_width: WIDTH_TYPE.LARGE,
    input_range: "application/pdf",
    db_field: "proof_of_pat_pub",
    validation: Validation.file(false),
  },
];

const SCHEMA = {
  id: "",
  last_modified: new Date(2000, 0, 1, 0, 0, 0, 0).toISOString(),
  diplay_name: "Patent Publication",
  fields: FIELDS,
};

const getValidationSchema = () => {
  let validationSchema = {};
  FIELDS.forEach((field) => {
    validationSchema[field.db_field] = field.validation;
  });
  return Yup.object().shape(validationSchema);
};

const export_object = { FIELDS, SCHEMA, getValidationSchema };

export default export_object;

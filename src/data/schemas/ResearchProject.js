import * as Yup from "yup";
import DomainIcon from "@mui/icons-material/Domain";

import {
  VALUE_TYPE,
  INPUT_TYPE,
  DB_FIELD_TYPE,
  WIDTH_TYPE,
} from "../types/types";
import Validation from "../validation/schemas";

const FIELDS = [
  {
    label: "Project Name",
    value: "",
    info: "Title or name of the Project",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.LARGE,
    db_field: "title",
    validation: Validation.string(),
  },
  {
    label: "Role Of Faculty",
    value: "",
    info: "Role Of Faculty",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.SELECT,
    view_width: WIDTH_TYPE.MEDIUM,
    options: [
      "Principal Investigator (PI)",
      "Co-Principal Investigator (Co-PI)",
    ],
    db_field: "fac_role",
    validation: Validation.option(),
  },
  {
    label: "Co-Principal Investigator Name",
    value: "",
    info: "Name of the Co-Pi",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "co_pi_name",
    validation: Validation.string(false),
  },
  {
    label: "Date of Sanction",
    value: new Date().toISOString(),
    info: "Date of Sanction",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "sanc_date",
    validation: Validation.date(),
  },
  {
    label: "Date of Completion",
    value: new Date().toISOString(),
    info: "Date of publication",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "comp_date",
    validation: Validation.date(false),
  },
  {
    label: "Amount Sanctioned (in INR)",
    value: "",
    info: "Amount Sanctioned (in INR)",
    type: VALUE_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    db_field_type: DB_FIELD_TYPE.STRING,
    view_width: WIDTH_TYPE.SMALL,
    db_field: "amount_sanc",
    validation: Validation.string(),
  },
  {
    label: "Duration of the project",
    value: "",
    info: "Duration of the project",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "proj_duration",
    validation: Validation.string(),
  },
  {
    label: "Name of the Funding Agency",
    value: "",
    info: "Name of the Funding Agency",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "fund_agency_name",
    validation: Validation.string(),
  },
  {
    label: "Type",
    value: "",
    info: "Type",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.SELECT,
    view_width: WIDTH_TYPE.MEDIUM,
    options: ["Government", "Non-Government", "International"],
    db_field: "type",
    validation: Validation.option(),
  },
  {
    label: "Utilization certificate submitted?",
    value: false,
    info: "Utilization certificate submitted?",
    type: VALUE_TYPE.BOOLEAN,
    input_type: INPUT_TYPE.CHECKBOX,
    db_field_type: DB_FIELD_TYPE.BOOLEAN,
    view_width: WIDTH_TYPE.SMALL,
    db_field: "util_cert",
    validation: Validation.boolean(),
  },
  {
    label: "Proof of Completion",
    value: {},
    info: "Proof of Completion",
    type: VALUE_TYPE.OBJECT,
    input_type: INPUT_TYPE.FILE,
    db_field_type: DB_FIELD_TYPE.OBJECT,
    view_width: WIDTH_TYPE.LARGE,
    input_range: "application/pdf",
    db_field: "proof",
    validation: Validation.file(false),
  },
];

const SCHEMA = {
  id: "",
  last_modified: new Date().toISOString(),
  diplay_name: "Research Project",
  key: "research-projects",
  icon: <DomainIcon />,
  fields: FIELDS,
  display_title: "title",
  display_date: "sanc_date",
};

const getValidationSchema = () => {
  let validationSchema = {};
  FIELDS.forEach((field) => {
    validationSchema[field.db_field] = field.validation;
  });
  return Yup.object().shape(validationSchema);
};

export { FIELDS, SCHEMA, getValidationSchema };

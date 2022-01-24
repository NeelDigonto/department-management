import * as Yup from "yup";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";

import {
  VALUE_TYPE,
  INPUT_TYPE,
  DB_FIELD_TYPE,
  WIDTH_TYPE,
} from "../types/types";
import * as Validation from "../validation/schemas";
import { FieldType, SchemaType } from "./types";

const FIELDS: FieldType[] = [
  {
    label: "Event Start Date",
    value: new Date().toISOString(),
    info: "Date of Event (From)",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "event_start_date",
    validation: Validation.date(),
  },
  {
    label: "Event End Date",
    value: new Date().toISOString(),
    info: "Date of Event (End)",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "event_end_date",
    validation: Validation.date(),
  },
  {
    label: "Subject/Topic",
    value: "",
    info: "Subject/Topic",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "subject",
    validation: Validation.string(),
  },
  {
    label: "Participants",
    value: 0,
    info: "Approximate Number of Participants",
    type: VALUE_TYPE.NUMBER,
    input_type: INPUT_TYPE.NUMBER,
    db_field_type: DB_FIELD_TYPE.INT32,
    view_width: WIDTH_TYPE.SMALL,
    db_field: "participants",
    validation: Validation.number(),
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
  diplay_name: "BSH Poster Competitions",
  key: "bsh-poster-competitions",
  icon: <ArtTrackIcon />,
  fields: FIELDS,
  display_title: "subject",
  display_date: "event_start_date",
  isCentral: true,
};

function getValidationSchema() {
  let validationSchema = {};
  FIELDS.forEach((field) => {
    validationSchema[field.db_field] = field.validation;
  });
  return Yup.object().shape(validationSchema);
}

export { FIELDS, SCHEMA, getValidationSchema };

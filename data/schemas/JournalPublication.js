import * as Yup from "yup";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE, WIDTH_TYPE } from "../types/types";
import Validation from "../validation/schemas";

const FIELDS = [
  {
    label: "Title",
    value: "",
    info: "Title of the Paper",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.LARGE,
    db_field: "title",
    validation: Validation.string(),
  },
  {
    label: "Author",
    value: "",
    info: "Author (Only name of the faculty associated with BSH, No Co-author) ",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "author",
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
    label: "Published on",
    value: new Date().toISOString(),
    info: "Year of Publication of the paper",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.DATE,
    input_type: INPUT_TYPE.DATE,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "yop",
    validation: Validation.date(),
  },
  {
    label: "Journal Name",
    value: "",
    info: "Name of the Journal",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.MEDIUM,
    db_field: "name_of_journ",
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
    label: "Impact Factor" /*make this field a color value*/,
    value: "",
    info: "Impact Factor (Write NA if there is no impact factor)",
    type: VALUE_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    db_field_type: DB_FIELD_TYPE.STRING,
    view_width: WIDTH_TYPE.SMALL,
    db_field: "impact_factor",
    validation: Validation.string(),
  },
  {
    label: "Volume No.",
    value: "",
    info: "Volume No. of the paper",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.SMALL,
    db_field: "vol_no",
    validation: Validation.string(),
  },
  {
    label: "Issue No.",
    value: "",
    info: "Issue No. of the paper",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.SMALL,
    db_field: "issue_no",
    validation: Validation.string(),
  },
  {
    label: "Page No.",
    value: "",
    info: "Page No. of the paper",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.SMALL,
    db_field: "page_no",
    validation: Validation.string(),
  },
  {
    label: "ISSN/ISBN No.",
    value: "",
    info: "ISSN/ISBN No. of the paper",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.LARGE,
    db_field: "issn_isbn",
    validation: Validation.string(),
  },
  {
    label: "Journal Website Link",
    value: "",
    info: "Website link of the Journal",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.TEXT,
    view_width: WIDTH_TYPE.LARGE,
    db_field: "journ_web_link",
    validation: Validation.url(),
  },
  {
    label: "Indexing",
    value: "",
    info: "Indexing of the paper",
    type: VALUE_TYPE.STRING,
    db_field_type: DB_FIELD_TYPE.STRING,
    input_type: INPUT_TYPE.CUSTOM_SELECT,
    view_width: WIDTH_TYPE.MEDIUM,
    options: [
      "Scopus",
      "Elsevier",
      "PubMed",
      "Google Scholar",
      "Sci-Hub",
      "ScienceDirect",
      "Web of Science",
      "Thomson Reuters ISI",
      "Sci",
      "Esci",
      "Scie",
    ],
    db_field: "indexing",
    validation: Validation.string(),
  },
  {
    label: "Invited Paper",
    value: false,
    info: "Whether the paper was an invited paper ? Input Yes/No",
    type: VALUE_TYPE.BOOLEAN,
    input_type: INPUT_TYPE.CHECKBOX,
    db_field_type: DB_FIELD_TYPE.BOOLEAN,
    view_width: WIDTH_TYPE.SMALL,
    db_field: "inv_paper",
    validation: Validation.boolean(),
  },
  {
    label: "Proof of Invitation",
    value: {},
    info: "Proof of Invitation (Upload pdf)",
    type: VALUE_TYPE.OBJECT,
    input_type: INPUT_TYPE.FILE,
    db_field_type: DB_FIELD_TYPE.OBJECT,
    view_width: WIDTH_TYPE.LARGE,
    input_range: "application/pdf",
    db_field: "prof_inv_file",
    validation: Yup.object().when(["inv_paper"], {
      is: true,
      then: Validation.file(true),
      otherwise: Validation.file(false),
    }),
  },
  {
    label: "Students Involved",
    value: 0,
    info: "Number of students involved (if any)",
    type: VALUE_TYPE.NUMBER,
    input_type: INPUT_TYPE.NUMBER,
    db_field_type: DB_FIELD_TYPE.INT32,
    view_width: WIDTH_TYPE.SMALL,
    db_field: "studs_involved",
    validation: Validation.number(),
  },
  {
    label: "Students who Co-authored",
    value: 0,
    info: "Name of the Students who are co-author",
    type: VALUE_TYPE.NUMBER,
    input_type: INPUT_TYPE.NUMBER,
    db_field_type: DB_FIELD_TYPE.INT32,
    view_width: WIDTH_TYPE.SMALL,
    db_field: "studs_coa_involved",
    validation: Validation.number(),
  },
  {
    label: "First Page of Publication",
    value: {},
    info: "Attachments",
    type: VALUE_TYPE.OBJECT,
    input_type: INPUT_TYPE.FILE,
    db_field_type: DB_FIELD_TYPE.OBJECT,
    view_width: WIDTH_TYPE.LARGE,
    input_range: "application/pdf",
    db_field: "first_page_pb",
    validation: Validation.file(),
  },
];

const SCHEMA = {
  id: "",
  last_modified: new Date(2000, 0, 1, 0, 0, 0, 0).toISOString(),
  diplay_name: "Journal Publication",
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

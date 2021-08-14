import * as Yup from "yup";

const PATENT_PUBLICATION_FIELDS = [
  {
    label: "Title",
    value: "",
    info: "Title of the Paper",
    excel_field_name: "Title",
    excel_col_width: 40,
    type: "string",
    input_type: "text",
    db_field: "title",
    validation: Yup.string().min(5, "Too Short!").max(100, "Too Long!").required("Required!"),
  },
];

const PATENT_PUBLICATION_SCHEMA = {
  sl_no: null,
  fields: PATENT_PUBLICATION_FIELDS,
};

const getPatentPublicationValidationSchema = () => {
  let publicationValidationSchema = {};
  PUBLICATION_FIELDS.forEach((field) => {
    publicationValidationSchema[field.db_field] = field.validation;
  });
  return Yup.object().shape(publicationValidationSchema);
};

export {
  PATENT_PUBLICATION_FIELDS,
  PATENT_PUBLICATION_SCHEMA,
  getPatentPublicationValidationSchema,
};

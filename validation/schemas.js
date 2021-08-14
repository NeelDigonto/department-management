import * as Yup from "yup";

const NAME_VALIDATION_SCHEMA = () =>
  Yup.string().min(2, "Too Short!").max(200, "Too Long!").required("Required!");

const ADDRESS_VALIDATION_SCHEMA = () =>
  Yup.string().min(5, "Too Short!").max(100, "Too Long!").required("Required!");

const EMAIL_VALIDATION_SCHEMA = () => Yup.string().email("Invalid email").required("Required!");

const OPTIONS_VALIDATION_SCHEMA = () => Yup.string().required("Required!");

const MOBILE_VALIDATION_SCHEMA = () =>
  Yup.string().length(10, "Must be of 10 digits!").required("Required!");

const LANDLINE_VALIDATION_SCHEMA = () =>
  Yup.string().length(8, "Must be of 10 digits!").required("Required!");

const DATE_VALIDATION_SCHEMA = () => Yup.date().required("Required!");

const FILE_VALIDATION_SCHEMA = () =>
  Yup.object().shape({ fname: Yup.string().required(), fuid: Yup.string().required() });

const FILE_REQUIRED_VALIDATION_SCHEMA = () =>
  Yup.object()
    .shape({ fname: Yup.string().required(), fuid: Yup.string().required() })
    .required("Required!");

const STRING_REQUIRED_VALIDATION_SCHEMA = () => Yup.string().required("Required!");
const BOOLEAN_REQUIRED_VALIDATION_SCHEMA = () => Yup.boolean().required("Required!");

export {
  NAME_VALIDATION_SCHEMA,
  ADDRESS_VALIDATION_SCHEMA,
  EMAIL_VALIDATION_SCHEMA,
  OPTIONS_VALIDATION_SCHEMA,
  MOBILE_VALIDATION_SCHEMA,
  LANDLINE_VALIDATION_SCHEMA,
  DATE_VALIDATION_SCHEMA,
  FILE_VALIDATION_SCHEMA,
  FILE_REQUIRED_VALIDATION_SCHEMA,
  STRING_REQUIRED_VALIDATION_SCHEMA,
  BOOLEAN_REQUIRED_VALIDATION_SCHEMA,
};

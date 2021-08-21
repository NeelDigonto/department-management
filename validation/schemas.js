import * as Yup from "yup";

const string = (required = true, minLength = 1, maxLength = 200) =>
  required
    ? Yup.string().min(minLength, "Too Short!").max(maxLength, "Too Long!").required("Required!")
    : Yup.string().min(minLength, "Too Short!").max(maxLength, "Too Long!");

const email = (required = true) =>
  required
    ? Yup.string().email("Invalid email").required("Required!")
    : Yup.string().email("Invalid email");

const option = (required = true) => (required ? Yup.string().required("Required!") : Yup.string());

const date = (required = true) =>
  required ? Yup.date("Not a date").required("Required!") : Yup.date("Not a date");

const file = (required = true) =>
  required
    ? Yup.object().shape({
        fname: Yup.string().required("File Required"),
        fuid: Yup.string().required("File Required"),
      })
    : Yup.object();

const boolean = (required = true) =>
  required ? Yup.boolean().required("Required!") : Yup.boolean();

const number = (required = true, integer = true, positive = true) => {
  let validation_object = Yup.number("Must be a Number").required("Required");

  required ? validation_object.required("Required") : validation_object;
  integer ? validation_object.integer("Must be an Integer") : validation_object;
  positive ? validation_object.positive("Must be Positive") : validation_object;

  /* ? Yup.number("Must be a Number")
        .required("Required")
        .positive("Must be Positive")
        .integer("Must be an Integer") */
};

const url = (required = true) =>
  required
    ? Yup.string().url("Must be a URL").required("Required!")
    : Yup.string().url("Must be a URL");

const export_object = { string, email, option, date, file, boolean, number, url };

export default export_object;

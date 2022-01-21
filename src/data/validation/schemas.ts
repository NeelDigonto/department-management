import * as Yup from "yup";

const string = (
  required: boolean = true,
  minLength: number = 1,
  maxLength: number = 100000
): any =>
  required
    ? Yup.string()
        .min(minLength, "Too Short!")
        .max(maxLength, "Too Long!")
        .required("Required!")
    : Yup.string().min(minLength, "Too Short!").max(maxLength, "Too Long!");

const email = (required: boolean = true): any =>
  required
    ? Yup.string().email("Invalid email").required("Required!")
    : Yup.string().email("Invalid email");

const option = (required: boolean = true): any =>
  required ? Yup.string().required("Required!") : Yup.string();

const date = (required: boolean = true): any =>
  required
    ? Yup.date().typeError("Must be a date").required("Required!")
    : Yup.date();

const file = (required: boolean = true): any =>
  required
    ? Yup.object({
        isLink: Yup.boolean(),
        flink: Yup.string().when("isLink", {
          is: true,
          then: Yup.string().required("File Required"),
          otherwise: Yup.string(),
        }),
        fname: Yup.string().when("isLink", {
          is: true,
          then: Yup.string(),
          otherwise: Yup.string().required("File Required"),
        }),
        fuid: Yup.string().when("isLink", {
          is: true,
          then: Yup.string(),
          otherwise: Yup.string().required("File Required"),
        }),
      })
    : Yup.object();

const boolean = (required: boolean = true): any =>
  required ? Yup.boolean().required("Required!") : Yup.boolean();

const number = (
  required: boolean = true,
  integer = true,
  positive = true
): any => {
  let validation_object = Yup.number().typeError("Must be a Number");

  validation_object = required
    ? validation_object.required("Required")
    : validation_object;
  validation_object = integer
    ? validation_object.integer("Must be an Integer")
    : validation_object;
  validation_object = positive
    ? validation_object.min(0, "Must be >= 0")
    : validation_object;

  return validation_object;
};

const url = (required: boolean = true): any =>
  required ? Yup.string().required("Required!") : Yup.string();
/*   required
  ? Yup.string().url("Must be a URL").required("Required!")
  : Yup.string().url("Must be a URL"); 
*/

export { string, email, option, date, file, boolean, number, url };

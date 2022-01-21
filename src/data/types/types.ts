enum VALUE_TYPE {
  STRING = "string",
  BOOLEAN = "boolean",
  OBJECT = "object",
  NUMBER = "number",
  DATE = "date",
}

enum DB_FIELD_TYPE {
  STRING = "string",
  OBJECT = "object",
  BOOLEAN = "boolean",
  DATE = "date",
  INT32 = "int32",
  Decimal128 = "decimal128",
}

enum INPUT_TYPE {
  TEXT = "text",
  SELECT = "select",
  CHECKBOX = "checkbox",
  FILE = "file",
  DATE = "date",
  EMAIL = "email",
  NUMBER = "number",
  MULTILINE_TEXT = "multiline-text",
  CUSTOM_SELECT = "custom-select",
}

enum WIDTH_TYPE {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE, WIDTH_TYPE };

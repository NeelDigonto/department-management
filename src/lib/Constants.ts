import process from "process";
//process.env.APP_NAME

export const APP_NAME: string = "Faculty Book";
export const APP_SITE_BASE_URL: string = "http://localhost:3000/";
export const PROFILE_SHEET_NAME: string = "Profile";
//export const CENTRAL_COLLECTION_NAME: string = "central";
export const CENTRAL_EMPLOYEE_ID: string = "CENTRAL";
export const CENTRAL_EMPLOYEE_PASSWORD: string = "none";
export const FACULTY_COLLECTION_NAME: string = "faculties";

export const RESERVED_EMPLOYEE_NAMES: string[] = [CENTRAL_EMPLOYEE_ID];

export const COLORS = {
  Charcoal: "#264653",
  PersianGreen: "#2A9D8F",
  OrangeYellowCrayola: "#E9C46A",
  SandyBrown: "#F4A261",
  BurntSienna: "#E76F51",
};

export default {
  APP_NAME,
  APP_SITE_BASE_URL,
  PROFILE_SHEET_NAME,
  CENTRAL_EMPLOYEE_ID,
  CENTRAL_EMPLOYEE_PASSWORD,
  FACULTY_COLLECTION_NAME,
  RESERVED_EMPLOYEE_NAMES,
  COLORS,
};

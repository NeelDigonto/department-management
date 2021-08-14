import * as Yup from "yup";
import { PROFILE_SCHEMA, PROFILE_FIELDS, getProfileValidationSchema } from "./schemas/Profile";
import {
  PUBLICATION_FIELDS,
  PUBLICATION_SCHEMA,
  getPublicationValidationSchema,
} from "./schemas/Publication";
const DataTypes = { string: 0, date: 1, bool: 3 };

const sidebarOptions = [
  { menuDisplay: "Profile", urlSuffix: "profile" },
  { menuDisplay: "Education", urlSuffix: "edudation" },
  { menuDisplay: "Conferences", urlSuffix: "conferences" },
  { menuDisplay: "Publications", urlSuffix: "publications" },
  { menuDisplay: "Experience", urlSuffix: "experience" },
  { menuDisplay: "Seminars", urlSuffix: "seminars" },
  { menuDisplay: "Projects", urlSuffix: "projects" },
];

const MASTER_SCHEMA = {
  employeeID: "",
  hashedPassword: "",
  profile: PROFILE_SCHEMA,
  publications: PUBLICATION_SCHEMA,
};

let mockProfile = {};
MASTER_SCHEMA["profile"].forEach((item) => {
  mockProfile[item.db_field] = item.value;
});
let EMPTY_USER_DOCUMENT = { employeeID: "", hashedPassword: "", profile: mockProfile };
EMPTY_USER_DOCUMENT["publications"] = [];

export {
  DataTypes,
  sidebarOptions,
  MASTER_SCHEMA,
  EMPTY_USER_DOCUMENT,
  getProfileValidationSchema,
  getPublicationValidationSchema,
};

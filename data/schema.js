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

const schema = {
  employeeID: "",
  hashedPassword: "",
  Profile: PROFILE_SCHEMA,
  Education: [],
  Conferences: [],
  Publications: PUBLICATION_SCHEMA,
  Experience: [],
  Seminars: [],
  Projects: [],
};

const MASTER_SCHEMA = { profile: PROFILE_SCHEMA, publications: PUBLICATION_SCHEMA };

export {
  DataTypes,
  sidebarOptions,
  schema,
  MASTER_SCHEMA,
  getProfileValidationSchema,
  getPublicationValidationSchema,
};

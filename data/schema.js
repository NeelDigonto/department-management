import * as Yup from "yup";

import Profile from "./schemas/Profile";
import ConferencePublication from "./schemas/ConferencePublication";
import JournalPublication from "./schemas/JournalPublication";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import SchoolIcon from "@material-ui/icons/School";
import BookIcon from "@material-ui/icons/Book";
import ComputerIcon from "@material-ui/icons/Computer";
import TableChartIcon from "@material-ui/icons/TableChart";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import VideocamIcon from "@material-ui/icons/Videocam";

const sidebarOptions = [
  { menuDisplay: "Profile", urlSuffix: "profile", icon: <DashboardIcon /> },
  { menuDisplay: "Journal Publications", urlSuffix: "journal-publications", icon: <BookIcon /> },
  {
    menuDisplay: "Conference Publications",
    urlSuffix: "conference-publications",
    icon: <VideocamIcon />,
  },
];

const ACHIEVEMENTS_GROUP_SCHEMA = {
  "conference-publications": ConferencePublication.SCHEMA,
  "journal-publications": JournalPublication.SCHEMA,
};

const MASTER_SCHEMA = {
  employeeID: "",
  hashedPassword: "",
  profile: Profile.SCHEMA,
  ...ACHIEVEMENTS_GROUP_SCHEMA,
};

const getEmptyUserDocument = () => {
  let mockProfile = {};
  MASTER_SCHEMA["profile"].forEach((item) => {
    mockProfile[item.db_field] = item.value;
  });
  let EMPTY_USER_DOCUMENT = { employeeID: "", hashedPassword: "", profile: mockProfile };
  for (let [key, value] of Object.entries(ACHIEVEMENTS_GROUP_SCHEMA)) {
    EMPTY_USER_DOCUMENT[key] = [];
  }
  return EMPTY_USER_DOCUMENT;
};

const getValidationSchema = (achievementCategory) => {
  switch (achievementCategory) {
    case "profile":
      return Profile.getValidationSchema;
    case "conference-publications":
      return ConferencePublication.getValidationSchema;
    case "journal-publications":
      return JournalPublication.getValidationSchema;
    default: {
      console.log("unkown item passed here: " + achievementCategory);
      return () => {};
    }
  }
};

export {
  sidebarOptions,
  ACHIEVEMENTS_GROUP_SCHEMA,
  MASTER_SCHEMA,
  getEmptyUserDocument,
  getValidationSchema,
};

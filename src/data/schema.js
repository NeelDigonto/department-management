import * as Profile from "./schemas/Profile";
import * as ConferencePublication from "./schemas/ConferencePublication";
import * as JournalPublication from "./schemas/JournalPublication";
import * as BookPublication from "./schemas/BookPublication";
import * as PatentPublication from "./schemas/PatentPublication";
import * as Copyright from "./schemas/Copyright";
import * as ResearchProject from "./schemas/ResearchProject";
import * as SeminarOrganized from "./schemas/SeminarOrganized";
import * as SeminarAttended from "./schemas/SeminarAttended";
import * as WebinarOrganized from "./schemas/WebinarOrganized";
import * as WebinarAttended from "./schemas/WebinarAttended";
import * as DistinguishedLectureOrganized from "./schemas/DistinguishedLectureOrganized";
import * as DistinguishedLectureAttended from "./schemas/DistinguishedLectureAttended";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import SchoolIcon from "@material-ui/icons/School";
import ComputerIcon from "@material-ui/icons/Computer";
import TableChartIcon from "@material-ui/icons/TableChart";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import BuildIcon from "@material-ui/icons/Build";

const ACHIEVEMENTS = [
  ConferencePublication,
  JournalPublication,
  BookPublication,
  PatentPublication,
  Copyright,
  ResearchProject,
  SeminarOrganized,
  SeminarAttended,
  WebinarOrganized,
  WebinarAttended,
  DistinguishedLectureOrganized,
  DistinguishedLectureAttended,
];

const getAchievementGroupSchema = () => {
  const ACHIEVEMENTS_GROUP_SCHEMA = {};
  ACHIEVEMENTS.forEach((_achievementCategory) => {
    ACHIEVEMENTS_GROUP_SCHEMA[_achievementCategory.SCHEMA.key] = _achievementCategory.SCHEMA;
  });
  return ACHIEVEMENTS_GROUP_SCHEMA;
};

const ACHIEVEMENTS_GROUP_SCHEMA = getAchievementGroupSchema();

const getAchievementValidationSchema = (category) => {
  const result = ACHIEVEMENTS.find(
    (_achievementCategory) => _achievementCategory.SCHEMA.key === category
  );

  if (!!result) {
    return result.getValidationSchema;
  } else {
    console.error(`${category} doesnt exist`);
    return () => {};
  }
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

export {
  ACHIEVEMENTS,
  ACHIEVEMENTS_GROUP_SCHEMA,
  MASTER_SCHEMA,
  getEmptyUserDocument,
  getAchievementValidationSchema,
};

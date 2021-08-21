import Profile from "./schemas/Profile";
import ConferencePublication from "./schemas/ConferencePublication";
import JournalPublication from "./schemas/JournalPublication";
import BookPublication from "./schemas/BookPublication";
import PatentPublication from "./schemas/PatentPublication";
import Copyright from "./schemas/Copyright";
import ResearchProject from "./schemas/ResearchProject";
import SeminarOrganized from "./schemas/SeminarOrganized";
import SeminarAttended from "./schemas/SeminarAttended";
import WebinarOrganized from "./schemas/WebinarOrganized";
import WebinarAttended from "./schemas/WebinarAttended";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
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
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SecurityIcon from "@material-ui/icons/Security";
import CopyrightIcon from "@material-ui/icons/Copyright";
import BuildIcon from "@material-ui/icons/Build";
import DomainIcon from "@material-ui/icons/Domain";
import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";

const sidebarOptions = [
  { menuDisplay: "Profile", urlSuffix: "profile", icon: <DashboardIcon /> },
  {
    menuDisplay: "Journal Publications",
    urlSuffix: "journal-publications",
    icon: <LibraryBooksIcon />,
  },
  {
    menuDisplay: "Conference Publications",
    urlSuffix: "conference-publications",
    icon: <VideocamIcon />,
  },
  {
    menuDisplay: "Books/Book Chapters Publication",
    urlSuffix: "book-publications",
    icon: <BookIcon />,
  },
  {
    menuDisplay: "Patent Publication",
    urlSuffix: "patent-publications",
    icon: <SecurityIcon />,
  },
  {
    menuDisplay: "Copyright",
    urlSuffix: "copyrights",
    icon: <CopyrightIcon />,
  },
  {
    menuDisplay: "Research Project",
    urlSuffix: "research-projects",
    icon: <DomainIcon />,
  },
  {
    menuDisplay: "Seminar Organized",
    urlSuffix: "seminar-organized",
    icon: <PeopleIcon />,
  },
  {
    menuDisplay: "Seminar Attended",
    urlSuffix: "seminar-attended",
    icon: <PeopleOutlineIcon />,
  },
  {
    menuDisplay: "Webinar Organized",
    urlSuffix: "webinar-organized",
    icon: <VideoLibraryIcon />,
  },
  {
    menuDisplay: "Webinar Attended",
    urlSuffix: "webinar-attended",
    icon: <VideoLibraryOutlinedIcon />,
  },
];

const ACHIEVEMENTS_GROUP_SCHEMA = {
  "conference-publications": ConferencePublication.SCHEMA,
  "journal-publications": JournalPublication.SCHEMA,
  "book-publications": BookPublication.SCHEMA,
  "patent-publications": PatentPublication.SCHEMA,
  copyrights: Copyright.SCHEMA,
  "research-projects": ResearchProject.SCHEMA,
  "seminar-organized": SeminarOrganized.SCHEMA,
  "seminar-attended": SeminarAttended.SCHEMA,
  "webinar-organized": WebinarOrganized.SCHEMA,
  "webinar-attended": WebinarAttended.SCHEMA,
};

const getValidationSchema = (achievementCategory) => {
  switch (achievementCategory) {
    case "profile":
      return Profile.getValidationSchema;
    case "conference-publications":
      return ConferencePublication.getValidationSchema;
    case "journal-publications":
      return JournalPublication.getValidationSchema;
    case "book-publications":
      return BookPublication.getValidationSchema;
    case "patent-publications":
      return PatentPublication.getValidationSchema;
    case "copyrights":
      return Copyright.getValidationSchema;
    case "research-projects":
      return ResearchProject.getValidationSchema;
    case "seminar-organized":
      return SeminarOrganized.getValidationSchema;
    case "seminar-attended":
      return SeminarAttended.getValidationSchema;
    case "webinar-organized":
      return WebinarOrganized.getValidationSchema;
    case "webinar-attended":
      return WebinarAttended.getValidationSchema;
    default: {
      console.log("unkown item passed here: " + achievementCategory);
      return () => {};
    }
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
  sidebarOptions,
  ACHIEVEMENTS_GROUP_SCHEMA,
  MASTER_SCHEMA,
  getEmptyUserDocument,
  getValidationSchema,
};

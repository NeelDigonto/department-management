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
import * as TrimentoringOrganized from "./schemas/TrimentoringOrganized";
import * as AlumniTalkOrganized from "./schemas/AlumniTalkOrganized";
import * as ClubOutreachProgramsOrganized from "./schemas/ClubOutreachProgramsOrganized";
import * as InvitedLectureSeminar from "./schemas/InvitedLectureSeminar";
import * as ConferenceOrganized from "./schemas/ConferenceOrganized";
import * as ConferenceAttended from "./schemas/ConferenceAttended";
import * as FDPWorkshopOrganized from "./schemas/FDPWorkshopOrganized";
import * as FDPWorkshopAttended from "./schemas/FDPWorkshopAttended";
import * as MOU from "./schemas/MOU";
import * as IndustryVisit from "./schemas/IndustryVisit";
import * as Collaborations from "./schemas/Collaborations";
import * as BSHProjectCompetitions from "./schemas/BSHProjectCompetitions";
import * as BSHPosterCompetitions from "./schemas/BSHPosterCompetitions";
import * as IntershipDetails from "./schemas/IntershipDetails";

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
  TrimentoringOrganized,
  AlumniTalkOrganized,
  ClubOutreachProgramsOrganized,
  InvitedLectureSeminar,
  ConferenceOrganized,
  ConferenceAttended,
  FDPWorkshopOrganized,
  FDPWorkshopAttended,
  MOU,
  IndustryVisit,
  Collaborations,
  BSHProjectCompetitions,
  BSHPosterCompetitions,
  IntershipDetails,
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

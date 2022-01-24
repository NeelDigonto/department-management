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
import * as MoU from "./schemas/MoU";
import * as IndustryVisit from "./schemas/IndustryVisit";
import * as Collaborations from "./schemas/Collaborations";
import * as BSHProjectCompetitions from "./schemas/BSHProjectCompetitions";
import * as BSHPosterCompetitions from "./schemas/BSHPosterCompetitions";
import * as IntershipDetails from "./schemas/IntershipDetails";

import { FieldType, SchemaType } from "./schemas/types";

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
  //DistinguishedLectureAttended,
  TrimentoringOrganized,
  AlumniTalkOrganized,
  ClubOutreachProgramsOrganized,
  InvitedLectureSeminar,
  ConferenceOrganized,
  ConferenceAttended,
  FDPWorkshopOrganized,
  FDPWorkshopAttended,
  MoU,
  IndustryVisit,
  Collaborations,
  BSHProjectCompetitions,
  BSHPosterCompetitions,
  IntershipDetails,
];

function getAchievementSchemaMap(): Map<string, SchemaType> {
  const ACHIEVEMENTS_SCHEMA_MAP = new Map<string, SchemaType>();

  ACHIEVEMENTS.forEach((_achievementCategory) => {
    ACHIEVEMENTS_SCHEMA_MAP.set(
      _achievementCategory.SCHEMA.key,
      _achievementCategory.SCHEMA
    );
  });
  return ACHIEVEMENTS_SCHEMA_MAP;
}

function getAchievementValidationSchema(category: string) {
  const result = ACHIEVEMENTS.find(
    (_achievementCategory) => _achievementCategory.SCHEMA.key === category
  );

  if (!!result) {
    return result.getValidationSchema;
  } else {
    console.error(`${category} doesnt exist`);
    return () => {};
  }
}

const ACHIEVEMENTS_SCHEMA_MAP: Map<string, SchemaType> =
  getAchievementSchemaMap();

const CENTRAL_ACHIEVEMENTS_SCHEMA_MAP: Map<string, SchemaType> = new Map(
  Array.from(ACHIEVEMENTS_SCHEMA_MAP).filter(
    ([key, schema]) => schema.isCentral
  )
);
const USER_ACHIEVEMENTS_SCHEMA_MAP: Map<string, SchemaType> = new Map(
  Array.from(ACHIEVEMENTS_SCHEMA_MAP).filter(
    ([key, schema]) => !schema.isCentral
  )
);

const MASTER_SCHEMA = {
  hashedPassword: "",
  profile: Profile.SCHEMA,
  //...ACHIEVEMENTS_GROUP_SCHEMA,
  ...ACHIEVEMENTS_SCHEMA_MAP, //ERROR: ig
};

function getEmptyUserDocument() {
  let mockProfile = {};
  MASTER_SCHEMA["profile"].forEach((item) => {
    mockProfile[item.db_field] = item.value;
  });
  let EMPTY_USER_DOCUMENT = {
    hashedPassword: "",
    profile: mockProfile,
  };

  /*   for (let [key, value] of ACHIEVEMENTS_SCHEMA_MAP.entries()) {
    EMPTY_USER_DOCUMENT[key] = [];
  } */

  ACHIEVEMENTS_SCHEMA_MAP.forEach((_, key) => (EMPTY_USER_DOCUMENT[key] = []));
  return EMPTY_USER_DOCUMENT;
}

export {
  ACHIEVEMENTS,
  ACHIEVEMENTS_SCHEMA_MAP,
  MASTER_SCHEMA,
  getEmptyUserDocument,
  getAchievementValidationSchema,
};

import { MASTER_SCHEMA, ACHIEVEMENTS_GROUP_SCHEMA } from "../data/schema";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE } from "../data/types/types";

const getTypedDocument = (_json) => {
  for (let [key, value] of Object.entries(_json)) {
    if (key === "profile") toTypedProfile(_json["profile"]);
    if (!!ACHIEVEMENTS_GROUP_SCHEMA[key]) {
      toTypedAchievements(_json[key], key);
    }
  }
  return _json;
};

const toTypedProfile = (_json) => {
  for (let [key, value] of Object.entries(_json)) {
    const field_schema = MASTER_SCHEMA["profile"].find((field) => field.db_field === key);
    if (!!field_schema && field_schema.db_field_type === DB_FIELD_TYPE.DATE) {
      _json[key] = new Date(value);
    }
  }
};

const toTypedAchievements = (_json, achievementCategory) => {
  _json.forEach((achievement, index) => {
    for (let [key, value] of Object.entries(achievement)) {
      const field_schema = MASTER_SCHEMA[achievementCategory]["fields"].find(
        (field) => field.db_field === key
      );
      if (!!field_schema && field_schema.db_field_type === DB_FIELD_TYPE.DATE) {
        _json[index][key] = new Date(value);
      }
    }

    if (!!achievement["last_modified"]) {
      achievement["last_modified"] = new Date(achievement["last_modified"]);
    }
  });
};

export { toTypedAchievements, toTypedProfile, getTypedDocument };

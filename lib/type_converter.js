import { Decimal128 } from "mongodb";

import { MASTER_SCHEMA, ACHIEVEMENTS_GROUP_SCHEMA } from "../data/schema";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE } from "../data/types/types";
import { isEmptyObject } from "./util";

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

const _convertToType = (_array) => {
  if (_array[1] === "$___convert_to___.date") {
    const date = new Date(_array[0]);
    if (!!date) return date;
    else console.error("Undefined date received");
  } else if (_array[1] === "$___convert_to___.decimal128") {
    const decimal_num = Decimal128.fromString(_array[0]);
    if (!!decimal_num) return decimal_num;
    else console.error("Undefined decimal_num received");
  }
};

const toTypedQuerry = (_json) => {
  if (!_json || isEmptyObject(_json)) return;

  if (Array.isArray(_json) && _json.length !== 2) {
    _json.map((item, index) => {
      if (Array.isArray(item) && item.length === 2) {
        _json[index] = _convertToType(value);
      } else toTypedQuerry(_json[index]);
    });
  }

  if (typeof _json === "object" && _json !== null && !Array.isArray(_json)) {
    for (let [key, value] of Object.entries(_json)) {
      if (
        Array.isArray(value) &&
        value.length === 2 &&
        typeof value[1] === "string" &&
        value[1].split(".")[0] === "$___convert_to___"
      ) {
        if (value[1].split(".")[1] === "date") _json[key] = _convertToDate(value);
        else console.warn("Wtf passed :", value[1].split(".")[1]);
      } else toTypedQuerry(_json[key]);
    }
  }
};

export { toTypedAchievements, toTypedProfile, getTypedDocument, toTypedQuerry };

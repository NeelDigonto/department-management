import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";
import { ACHIEVEMENTS_SCHEMA_MAP } from "@data/schema";
import { INPUT_TYPE } from "@data/types/types";
import { Session } from "next-auth";
import * as Constants from "@lib/Constants";

function isEmptyObject(obj: any): boolean {
  return !!obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

function isValidDate(_date: Date): boolean {
  if (Object.prototype.toString.call(_date) === "[object Date]") {
    // it is a date
    if (isNaN(_date.getTime())) {
      // d.valueOf() could also work
      // date is not valid
      return false;
    } else {
      // date is valid
      return true;
    }
  } else {
    // not a date
    return false;
  }
}

enum MethodType {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

function assertRequestMethod(
  _req: NextApiRequest,
  _res: NextApiResponse,
  _method_type: MethodType
): boolean {
  if (_req.method !== _method_type) {
    _res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return false;
  }
  return true;
}

function assertIsAuthorized(
  _session: Session,
  _res: NextApiResponse,
  employeeID?: string
): boolean {
  if (!_session) {
    console.log();
    _res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return false;
  }

  if (
    !!employeeID &&
    !_session.user.isAdmin &&
    (_session.user.employeeID !== employeeID ||
      employeeID === Constants.CENTRAL_EMPLOYEE_ID)
  ) {
    _res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
    return false;
  }

  return true;
}

function assertHasEditAccess(): boolean {
  return true;
}

function assertIsAdmin(_session, _res: NextApiResponse): boolean {
  if (!_session) {
    _res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return false;
  } else if (_session.user.isAdmin !== true) {
    _res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
    return false;
  }

  return true;
}

function assertTry(
  _try_func: () => any,
  _cleanup_func: () => any,
  _res: NextApiResponse
): boolean {
  try {
    _try_func();
  } catch (err) {
    console.error("APP ERROR : ", err);
    _cleanup_func();
    _res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return false;
  }

  return true;
}

function getCurrentFiles(_rawData: any): string[] {
  const fileSchemas: Map<string, string[]> = new Map<string, string[]>();

  ACHIEVEMENTS_SCHEMA_MAP.forEach((category) => {
    const file_fields: string[] = [];
    category.fields.forEach((field) => {
      if (field.input_type === INPUT_TYPE.FILE)
        file_fields.push(field.db_field);
    });
    fileSchemas.set(category.key, file_fields);
  });

  const currentFiles: string[] = [];

  _rawData.forEach((user: any) => {
    fileSchemas.forEach((file_fields, achievementCategory) => {
      if (!!user[achievementCategory]) {
        file_fields.forEach((file_field) => {
          user[achievementCategory].forEach((achievement) => {
            if (
              !!achievement[file_field] &&
              !isEmptyObject(achievement[file_field])
            ) {
              const item = achievement[file_field];
              if (item.isLink === false) {
                currentFiles.push(item.fuid);
              }
            }
          });
        });
      }
    });
  });

  return currentFiles;
}

function getFilesToRemove(
  allSavedFiles: string[],
  currentRequiredFiles: string[]
): string[] {
  const currentRequiredFilesHash = {};
  currentRequiredFiles.forEach(
    (fuid) => (currentRequiredFilesHash[fuid] = true)
  );
  const filesToRemove: string[] = [];

  allSavedFiles.forEach((fuid) => {
    if (!currentRequiredFilesHash[fuid]) filesToRemove.push(fuid);
  });

  return filesToRemove;
}

function generateDisplayWithProfile(display: Object) {
  const display_with_profile = { ...display };
  Object.entries(display).forEach(([_key, _entry]) => {
    if (String(_key).startsWith("profile")) delete display_with_profile[_key];
  });
  display_with_profile["profile"] = 1;

  return display_with_profile;
}

function generateProjectionFilter(display: Object, filter: Object) {
  let projectionFilter = { profile: 1 };

  ACHIEVEMENTS_SCHEMA_MAP.forEach((_, category: string) => {
    if (!!filter[category]) {
      // setup
      projectionFilter[category] = {
        $filter: {
          input: `$${category}`,
          as: "achievement",
          cond: { $and: [] },
        },
      };

      for (let [key, value] of Object.entries(filter[category]["$elemMatch"])) {
        if (!!value["$regex"]) {
          projectionFilter[category]["$filter"]["cond"]["$and"].push({
            $regexMatch: {
              input: `$$achievement.${key}`,
              regex: value["$regex"],
              options: value["$options"],
            },
          });
        }

        ["$lt", "$lte", "$gt", "$gte", "$eq", "$ne", "$in"].forEach(
          (operator) => {
            if (!!value[operator]) {
              projectionFilter[category]["$filter"]["cond"]["$and"].push({
                [operator]: [`$$achievement.${key}`, value[operator]],
              });
            }
          }
        );
      }
    } else {
      projectionFilter[category] = 1;
    }
  });

  return projectionFilter;
}

export {
  isEmptyObject,
  isValidDate,
  assertRequestMethod,
  MethodType,
  assertIsAdmin,
  assertTry,
  assertIsAuthorized,
  getCurrentFiles,
  getFilesToRemove,
  generateDisplayWithProfile,
  generateProjectionFilter,
};

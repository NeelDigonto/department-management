import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

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

export {
  isEmptyObject,
  isValidDate,
  assertRequestMethod,
  MethodType,
  assertIsAdmin,
  assertTry,
};

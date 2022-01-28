import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { deleteFile } from "../../../../src/lib/aws-wrapper";
import * as util from "../../../../src/lib/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!util.assertRequestMethod(req, res, util.MethodType.DELETE)) return;

  const session = await getSession({ req });
  if (!util.assertIsAdmin(session, res)) return;

  const { fuid } = req.query;

  try {
    deleteFile(fuid);
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }

  res.status(StatusCodes.OK).send(ReasonPhrases.OK);
}

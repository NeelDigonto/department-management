import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from "http-status-codes";
import { getSession } from "next-auth/client";

import { deleteFile } from "../../../../src/lib/aws-wrapper";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  }

  const { fuid } = req.query;

  try {
    deleteFile(fuid);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }

  res.status(StatusCodes.OK).send(ReasonPhrases.OK);
}

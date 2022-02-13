import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

import { downloadFileStream, getFileHead } from "@lib/aws-wrapper";
import * as util from "@lib/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!util.assertRequestMethod(req, res, util.MethodType.GET)) return;

  // Leting everyone access this link?
  // let everyone access, but limit bandwith somehow

  const fuid = req.query.fuid as string;

  try {
    await getFileHead(fuid, (data) => {
      res.status(200);
      if (!!data.ContentLength)
        res.setHeader("Content-Length", data.ContentLength);
      if (!!data.ContentDisposition)
        res.setHeader("Content-Disposition", data.ContentDisposition);
      if (!!data.ContentEncoding)
        res.setHeader("Content-Encoding", data.ContentEncoding);
      if (!!data.ContentType) res.setHeader("Content-Type", data.ContentType);
      if (!!data.AcceptRanges)
        res.setHeader("Accept-Ranges", data.AcceptRanges);
    });

    const { downloadStream } = downloadFileStream(fuid);

    await new Promise(function (resolve) {
      downloadStream.pipe(res);
      downloadStream.on("end", resolve);
    });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }
}

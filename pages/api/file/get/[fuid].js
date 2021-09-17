import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from "http-status-codes";

import { downloadFileStream, getFileHead } from "../../../../src/lib/aws-wrapper";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  // Leting everyone access this link?

  const { fuid } = req.query;

  try {
    await getFileHead(fuid, (data) => {
      res.status(200);
      if (!!data.ContentLength) res.setHeader("Content-Length", data.ContentLength);
      if (!!data.ContentDisposition) res.setHeader("Content-Disposition", data.ContentDisposition);
      if (!!data.ContentEncoding) res.setHeader("Content-Encoding", data.ContentEncoding);
      if (!!data.ContentType) res.setHeader("Content-Type", data.ContentType);
      if (!!data.AcceptRanges) res.setHeader("Accept-Ranges", data.AcceptRanges);
    });

    const { downloadStream } = downloadFileStream(fuid);

    await new Promise(function (resolve) {
      downloadStream.pipe(res);
      downloadStream.on("end", resolve);
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    return;
  }
}

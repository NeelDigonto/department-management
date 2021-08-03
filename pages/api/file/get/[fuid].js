import { downloadFileStream, getFileHead } from "../../../../lib/aws-wrapper";

export default async function handler(req, res) {
  //check if user is allowed to acces this api

  const { fuid } = req.query;

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
}

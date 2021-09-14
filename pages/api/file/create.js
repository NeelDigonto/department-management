import Busboy from "busboy";
import { uploadFileStream } from "../../../lib/aws-wrapper";
import { v4 as uuidv4 } from "uuid";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  }

  const fuid = uuidv4();

  await new Promise(function (resolve, reject) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on("file", async function (fieldname, fileStream, filename, encoding, mimetype) {
      uploadFileStream(fileStream, fuid, filename, mimetype, encoding);
    });

    busboy.on("finish", function () {
      res.status(StatusCodes.CREATED).json({ fuid: fuid });
      resolve();
    });

    try {
      req.pipe(busboy);
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
      return;
    }
  });
}

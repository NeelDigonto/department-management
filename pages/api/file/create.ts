import Busboy from "busboy";
import { v4 as uuidv4 } from "uuid";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";

import * as util from "../../../src/lib/util";
import { uploadFileStream } from "../../../src/lib/aws-wrapper";
import { getMongoClient } from "../../../src/lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!util.assertRequestMethod(req, res, util.MethodType.POST)) return;

  const session = await getSession({ req });
  if (!util.assertIsAuthorized(session, res)) return;
  // anyone can create a file

  const fuid = uuidv4();

  await new Promise<void>(function (_resolve, _reject) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on(
      "file",
      async function (fieldname, fileStream, filename, encoding, mimetype) {
        uploadFileStream(fileStream, fuid, filename, mimetype, encoding);
      }
    );

    busboy.on("finish", async function () {
      res.status(StatusCodes.CREATED).json({ fuid: fuid });

      const client = await getMongoClient();
      const connection = await client.connect();

      const usersCollection = connection.db("users").collection("files");

      let insertResult;
      insertResult = await usersCollection.insertOne({ fuid: fuid });

      connection.close();

      _resolve();
    });

    try {
      req.pipe(busboy);
    } catch (err) {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
      return;
    }
  });
}

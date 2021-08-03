import Busboy from "busboy";
import { uploadFileStream } from "../../../lib/aws-wrapper";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const fuid = uuidv4();

  var busboy = new Busboy({ headers: req.headers });
  busboy.on("file", async function (fieldname, fileStream, filename, encoding, mimetype) {
    uploadFileStream(fileStream, fuid, filename, mimetype, encoding);

    //check if upload succeded

    /*     console.log(
      "File [" +
        fieldname +
        "]: filename: " +
        filename +
        ", encoding: " +
        encoding +
        ", mimetype: " +
        mimetype
    );

    file.on("data", function (data) {
      console.log("File [" + fieldname + "] got " + data.length + " bytes");
    });
    file.on("end", async function () {
      console.log("File [" + fieldname + "] Finished");

    }); */
  });

  /*   busboy.on(
    "field",
    function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
       console.log("Field [" + fieldname + "]: value: " + inspect(val)); 
    }
  ); */

  busboy.on("finish", function () {
    /*     console.log("Done parsing form!"); */
    /* res.writeHead(303, { Connection: "close", Location: "/" }); */

    res.status(200).end(JSON.stringify({ status: "ok", fuid: fuid }));
  });
  req.pipe(busboy);
}

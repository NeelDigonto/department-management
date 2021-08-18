import S3 from "aws-sdk/clients/s3";
import contentDisposition from "content-disposition";
import { v4 as uuidv4 } from "uuid";

const bucketName = "iem-faculty-book";
const region = "ap-south-1";
const accessKeyId = "AKIA3BLTTFZBDGK4VEPH";
const secretAccessKey = "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";

const s3 = new S3({ region, accessKeyId, secretAccessKey });

const uploadFileStream = (fileStream, file_key, fileName, mimeType, ContentEncoding) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file_key,
    ContentEncoding: ContentEncoding,
    ContentType: mimeType,
    ContentDisposition: contentDisposition(fileName, {
      type: "inline",
    }),
  };

  return s3.upload(uploadParams, function (err, data) {
    //handle error
    if (err) {
      console.log("Error", err);
    }
    //success
    if (data) {
      /* console.log("Uploaded in:", data.Location); */
    }
  });
};

const downloadFileStream = (file_key) => {
  const downloadParams = { Bucket: bucketName, Key: file_key };
  const downloadStream = s3.getObject(downloadParams).createReadStream();
  return { downloadStream: downloadStream };
};

const getFileHead = (file_key, set_res_callback) => {
  var headParams = {
    Bucket: bucketName,

    Key: file_key,
  };

  return s3
    .headObject(headParams)
    .promise()
    .then((data) => {
      set_res_callback(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteFile = (file_key) => {
  const deleteParams = { Bucket: bucketName, Key: file_key };
  s3.deleteObject(deleteParams, function (err, data) {
    if (err) {
      console.log(err);
    }
    if (data) {
    }
  });
};

export { uploadFileStream, downloadFileStream, getFileHead, deleteFile };

import S3 from "aws-sdk/clients/s3";
import contentDisposition from "content-disposition";
import internal from "stream";

const bucketName: string = "iem-faculty-book";
const region: string = "ap-south-1";
const accessKeyId: string = "AKIA3BLTTFZBDGK4VEPH";
const secretAccessKey: string = "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";

const s3 = new S3({ region, accessKeyId, secretAccessKey });

function uploadFileStream(
  _fileStream: S3.Body,
  _file_key: string,
  _fileName: string,
  _mimeType: string,
  _contentEncoding: string
): S3.ManagedUpload {
  const uploadParams: S3.PutObjectRequest = {
    Bucket: bucketName,
    Body: _fileStream,
    Key: _file_key,
    ContentEncoding: _contentEncoding,
    ContentType: _mimeType,
    ContentDisposition: contentDisposition(_fileName, {
      type: "attachment",
    }),
  };

  return s3.upload(uploadParams, function (err: any, data: any) {
    //handle error
    if (err) {
      console.log("Error", err);
    }
    //success
    if (data) {
      // console.log("Uploaded in:", data.Location);
    }
  });
}

function downloadFileStream(_file_key: string): {
  downloadStream: internal.Readable;
} {
  const downloadParams: S3.GetObjectRequest = {
    Bucket: bucketName,
    Key: _file_key,
  };
  const downloadStream = s3.getObject(downloadParams).createReadStream();
  return { downloadStream: downloadStream };
}

function getFileHead(_file_key: string, _set_res_callback) {
  var headParams: S3.HeadObjectRequest = {
    Bucket: bucketName,
    Key: _file_key,
  };

  return s3
    .headObject(headParams)
    .promise()
    .then((data) => {
      _set_res_callback(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

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

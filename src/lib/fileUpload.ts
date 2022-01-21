import axios from "axios";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

const stageFileUpload = async (
  file,
  setIsUploading: (...args: any[]) => any,
  callbackFunc: (...args: any[]) => any
) => {
  if (!!file) {
    setIsUploading(true);

    const handleFileUpload = async () => {
      let formData = new FormData();
      formData.append("file", file);
      const fuid = await axios({
        url: "/api/file/create",
        method: "POST",
        data: formData,
      })
        .then((response) => {
          if (response.status === StatusCodes.CREATED) {
            return response.data;
          } else
            throw `Server responded with: ${getReasonPhrase(response.status)}`;
        })
        .then((result) => {
          return result.fuid;
        });
      return fuid;
    };

    const fuid = await handleFileUpload();

    setIsUploading(false);
    callbackFunc({ fname: file.name, fuid: fuid });
  }
};

export default stageFileUpload;

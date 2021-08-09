import axios from "axios";
const stageFileUpload = async (file, setIsUploading, callbackFunc) => {
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
        .then((response) => response.data)
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

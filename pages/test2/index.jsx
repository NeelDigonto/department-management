import React, { useState, useRef } from "react";

import { Button } from "@material-ui/core";
import axios from "axios";
import { blue } from "@material-ui/core/colors";

const FileTest = () => {
  const [file, setFile] = useState(null);
  const link_ref = useRef(null);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!!file) {
      let formData = new FormData();

      formData.append("file", file);

      axios({
        url: "/api/file/create",
        method: "POST",
        data: formData,
      })
        .then((response) => response.data)
        .then((result) => {
          link_ref.current.innerHTML = `/api/file/get/${result.fuid}`;
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange}></input>
      <button onClick={handleUpload}>Upload</button>
      <div>
        <a
          href=""
          ref={link_ref}
          style={{ color: "blue", padding: "5rem", margin: "20rem", fontSize: "3rem" }}
        >
          Open The file
        </a>
        <div ref={link_ref}></div>
      </div>
    </div>
  );
};

export default FileTest;

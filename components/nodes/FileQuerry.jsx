import React, { Fragment, useState, useEffect, useRef } from "react";
import { TextField } from "@material-ui/core";

const FileQuerry = ({ field, categoryName, valueLastUpdatedRef, filterRef }) => {
  const handleChange = (event) => {
    valueLastUpdatedRef.current = new Date();

    filterRef.current[`${categoryName}.${field.db_field}.fname`] = {
      $regex: event.target.value,
      $options: "im",
    };
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      label={field.label}
      name={field.db_field}
      onChange={handleChange}
    ></TextField>
  );
};

export default FileQuerry;

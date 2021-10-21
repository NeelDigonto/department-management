import React from "react";
import { TextField } from "@mui/material";

const FileQuerry = ({
  field,
  categoryName,
  valueLastUpdatedRef,
  filterRef,
}) => {
  const handleChange = (event) => {
    valueLastUpdatedRef.current = new Date();

    //`${categoryName}.${field.db_field}.fname`
    filterRef.current[`${categoryName}.${field.db_field}`] = {
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

import React from "react";
import { TextField } from "@mui/material";

const TextQuerry = ({
  field,
  categoryName,
  valueLastUpdatedRef,
  filterRef,
}) => {
  const handleChange = (event) => {
    valueLastUpdatedRef.current = new Date();

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

export default TextQuerry;

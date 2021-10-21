import React from "react";
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";

const SelectQuerry = ({
  field,
  categoryName,
  valueLastUpdatedRef,
  filterRef,
}) => {
  const handleChange = (event) => {
    valueLastUpdatedRef.current = new Date();

    if (
      !filterRef.current[`${categoryName}.${field.db_field}`] ||
      !filterRef.current[`${categoryName}.${field.db_field}`]["$in"]
    ) {
      filterRef.current[`${categoryName}.${field.db_field}`] = { $in: [] };
    }

    if (event.target.checked) {
      filterRef.current[`${categoryName}.${field.db_field}`]["$in"].push(
        event.target.name
      );
    } else
      filterRef.current[`${categoryName}.${field.db_field}`]["$in"] =
        filterRef.current[`${categoryName}.${field.db_field}`]["$in"].filter(
          (item) => item !== event.target.name
        );
  };

  return (
    <FormControl
      component="fieldset"
      sx={{ margin: (theme) => theme.spacing(3) }}
    >
      <FormLabel component="legend">Select the options</FormLabel>
      <FormGroup>
        {field.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox name={option} />}
            label={option}
            onChange={handleChange}
          />
        ))}
      </FormGroup>
      {/*           <FormHelperText>Be careful</FormHelperText> */}
    </FormControl>
  );
};

export default SelectQuerry;

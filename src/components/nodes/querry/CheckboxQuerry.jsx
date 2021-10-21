import React from "react";
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";

const CheckboxQuerry = ({
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
        event.target.name === "true" ? true : false
      );
    } else {
      const option = event.target.name === "true" ? true : false;
      filterRef.current[`${categoryName}.${field.db_field}`]["$in"] =
        filterRef.current[`${categoryName}.${field.db_field}`]["$in"].filter(
          (item) => item !== option
        );
    }
  };

  return (
    <FormControl
      component="fieldset"
      sx={{ margin: (theme) => theme.spacing(3) }}
    >
      <FormLabel component="legend">Select the options</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox name={"true"} />}
          label={"True"}
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox name={"false"} />}
          label={"False"}
          onChange={handleChange}
        />
      </FormGroup>
      {/*           <FormHelperText>Be careful</FormHelperText> */}
    </FormControl>
  );
};

export default CheckboxQuerry;

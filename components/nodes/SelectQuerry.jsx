import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

const SelectQuerry = ({ field, categoryName, valueLastUpdatedRef, filterRef }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    valueLastUpdatedRef.current = new Date();

    if (
      !filterRef.current[`${categoryName}.${field.db_field}`] ||
      !filterRef.current[`${categoryName}.${field.db_field}`]["$in"]
    ) {
      filterRef.current[`${categoryName}.${field.db_field}`] = { $in: [] };
    }

    if (event.target.checked) {
      filterRef.current[`${categoryName}.${field.db_field}`]["$in"].push(event.target.name);
    } else
      filterRef.current[`${categoryName}.${field.db_field}`]["$in"] = filterRef.current[
        `${categoryName}.${field.db_field}`
      ]["$in"].filter((item) => item !== event.target.name);
  };

  return (
    <FormControl component="fieldset" className={classes.formControl}>
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

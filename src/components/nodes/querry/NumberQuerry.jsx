import React, { Fragment, useRef } from "react";
import { TextField, MenuItem, Grid } from "@mui/material";

const NUMBER_FILTER_OPTIONS = [
  { display: "Less Than", code: "$lt" },
  { display: "Less Than Equal", code: "$lte" },
  { display: "Greater Than", code: "$gt" },
  { display: "Greater Than Equal", code: "$gte" },
  { display: "Equal To", code: "$eq" },
  { display: "Not Equal To", code: "$ne" },
];

const NumberQuerry = ({
  field,
  categoryName,
  valueLastUpdatedRef,
  filterRef,
}) => {
  const querryNumberRef = useRef(0);
  const querryOptionRef = useRef("");

  const handleChange = () => {
    valueLastUpdatedRef.current = new Date();
    if (
      querryNumberRef.current !== undefined ||
      querryNumberRef.current !== null
    )
      filterRef.current[`${categoryName}.${field.db_field}`] = {
        [querryOptionRef.current]: querryNumberRef.current,
      };
  };

  return (
    <Fragment>
      <TextField
        id={categoryName + field.db_field}
        fullWidth
        select
        label={"Select Option"}
        name={categoryName + field.db_field}
        onChange={(event) => {
          querryOptionRef.current = event.target.value;
          handleChange();
        }}
        defaultValue={querryOptionRef.current}
      >
        {NUMBER_FILTER_OPTIONS.map((option, index) => (
          <MenuItem key={index} value={option.code}>
            {option.display}
          </MenuItem>
        ))}
      </TextField>
      <Grid container direction="row" justifyContent="space-around">
        <Grid item>
          <TextField
            fullWidth
            key={field.db_field}
            type="number"
            label={"Number"}
            onChange={(event) => {
              const value = event.target.valueAsNumber;
              querryNumberRef.current = value;
              handleChange();
            }}
            defaultValue={querryNumberRef.current}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default NumberQuerry;

import React, { Fragment, useRef, useState, useEffect, useCallback } from "react";
import { TextField, MenuItem, Grid } from "@material-ui/core";

const DATE_FILTER_OPTIONS = [
  { display: "Less Than", code: "$lt" },
  { display: "Less Than Equal", code: "$lte" },
  { display: "Greater Than", code: "$gt" },
  { display: "Greater Than Equal", code: "$gte" },
  { display: "Equal To", code: "$eq" },
  { display: "Not Equal To", code: "$ne" },
];

const DateQuerry = ({ field, categoryName, valueLastUpdatedRef, filterRef }) => {
  //const [selectedQuerryType, setSelectedQuerryType] = useState(DATE_FILTER_OPTIONS[0].code);
  const [selectedQuerryType, setSelectedQuerryType] = useState("");
  const [querryDate, setQuerryDate] = useState("2000-01-01");

  const handleChange = (_selectedQuerryType) => {
    const queryCode = !!_selectedQuerryType ? _selectedQuerryType : selectedQuerryType;

    valueLastUpdatedRef.current = new Date();
    const date = new Date(querryDate);
    if (!!date)
      filterRef.current[`${categoryName}.${field.db_field}`] = {
        [queryCode]: [date.toISOString(), "$___convert_to___.date"],
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
          const value = event.target.value;
          setSelectedQuerryType(value);
          handleChange(value);
        }}
        value={selectedQuerryType}
      >
        {DATE_FILTER_OPTIONS.map((option, index) => (
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
            type="date"
            label={"Date"}
            onChange={(event) => {
              const value = event.target.value;
              setQuerryDate(value);
              handleChange();
            }}
            value={querryDate}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DateQuerry;

import React, { Fragment, useRef, useState, useEffect, useCallback } from "react";
import { TextField, MenuItem, Grid } from "@material-ui/core";

const DATE_FILTER_OPTIONS = [
  { display: "Less Than", code: "$lt" },
  { display: "Less Than Equal", code: "$lte" },
  { display: "Greater Than", code: "$gt" },
  { display: "Greater Than Equal", code: "$gte" },
  { display: "Equal To", code: "$eq" },
  { display: "Not Equal To", code: "$ne" },
  { display: "In Range", code: "$gte$lt" },
];

const getDateString = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  const date_string = `${year}-${month}-${day}`;
  return date_string;
};

const DateQuerry = ({ field, categoryName, valueLastUpdatedRef, filterRef }) => {
  //const [selectedQuerryType, setSelectedQuerryType] = useState(DATE_FILTER_OPTIONS[0].code);
  const [querryType, setQuerryType] = useState(DATE_FILTER_OPTIONS[0].code);
  const [querryDate, setQuerryDate] = useState(new Date());
  const [querryRangedDate, setQuerryRangedDate] = useState([new Date(), new Date()]);

  useEffect(() => {
    valueLastUpdatedRef.current = new Date();

    if (querryType === "$gte$lt") {
      filterRef.current[`${categoryName}.${field.db_field}`] = {
        ["$gte"]: [querryRangedDate[0].toISOString(), "$___convert_to___.date"],
        ["$lt"]: [querryRangedDate[1].toISOString(), "$___convert_to___.date"],
      };
    } else {
      filterRef.current[`${categoryName}.${field.db_field}`] = {
        [querryType]: [querryDate.toISOString(), "$___convert_to___.date"],
      };
    }
  }, [
    valueLastUpdatedRef,
    categoryName,
    field.db_field,
    filterRef,
    querryType,
    querryDate,
    querryRangedDate,
  ]);

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
          setQuerryType(value);
        }}
        value={querryType}
      >
        {DATE_FILTER_OPTIONS.map((option, index) => (
          <MenuItem key={index} value={option.code}>
            {option.display}
          </MenuItem>
        ))}
      </TextField>
      {querryType === "$gte$lt" ? (
        <Grid container direction="row" justifyContent="space-around">
          <Grid item>
            <TextField
              fullWidth
              key={field.db_field}
              type="date"
              label={"From"}
              onChange={(event) => {
                const date = event.target.valueAsDate;
                setQuerryRangedDate((oldValue) => [date, oldValue[1]]);
              }}
              value={getDateString(querryRangedDate[0])}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              key={field.db_field}
              type="date"
              label={"To"}
              onChange={(event) => {
                const date = event.target.valueAsDate;
                setQuerryRangedDate((oldValue) => [oldValue[0], date]);
              }}
              value={getDateString(querryRangedDate[1])}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" justifyContent="space-around">
          <Grid item>
            <TextField
              fullWidth
              key={field.db_field}
              type="date"
              label={"Date"}
              onChange={(event) => {
                const date = event.target.valueAsDate;
                setQuerryDate(date);
              }}
              value={getDateString(querryDate)}
            />
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default DateQuerry;

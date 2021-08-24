import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  makeStyles,
} from "@material-ui/core";

import { isEmptyObject } from "../../lib/util";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE } from "../../data/types/types";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

const NUMBER_FILTER_TYPES = {
  EQUAL: { display: "=", code: "$eq" },
  EQUAL: { display: "!=", code: "$ne" },
  EQUAL: { display: "<", code: "$lt" },
  EQUAL: { display: "<=", code: "$lte" },
  EQUAL: { display: "> ", code: "$gt" },
  EQUAL: { display: ">=", code: "$gte" },
  // $nin
  // $nin
};

const FilterNode = ({
  field,
  valueLastUpdatedRef,
  categoryName,
  filterRef,
  sortRef,
  displayRef,
}) => {
  const classes = useStyles();

  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const [display, setDisplay] = useState(false);

  const actions = (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={filter}
            onChange={() => {
              valueLastUpdatedRef.current = new Date();
              setFilter((oldState) => {
                if (oldState) {
                  delete filterRef.current[`${categoryName}.${field.db_field}`];
                }
                return !oldState;
              });
            }}
            name={field.db_field}
            color="primary"
          />
        }
        label={"Filter"}
      ></FormControlLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={sort}
            onChange={() => {
              valueLastUpdatedRef.current = new Date();
              setSort((oldState) => {
                if (oldState) delete sortRef.current[`${categoryName}.${field.db_field}`];
                return !oldState;
              });
            }}
            name={field.db_field}
            color="primary"
          />
        }
        label={"Sort"}
      ></FormControlLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={display}
            onChange={() => {
              valueLastUpdatedRef.current = new Date();
              setDisplay((oldState) => {
                if (oldState) delete displayRef.current[`${categoryName}.${field.db_field}`];
                else displayRef.current[`${categoryName}.${field.db_field}`] = 1;
                return !oldState;
              });
            }}
            name={field.db_field}
            color="primary"
          />
        }
        label={"Display"}
      ></FormControlLabel>
    </Box>
  );

  let filterNode = null;
  let sortNode = null;

  switch (field.input_type) {
    case INPUT_TYPE.TEXT: {
      filterNode = filter ? (
        <TextField
          fullWidth
          variant="outlined"
          label={field.label}
          name={field.db_field}
          onChange={(event) => {
            valueLastUpdatedRef.current = new Date();
            filterRef.current[`${categoryName}.${field.db_field}`] = {
              $regex: event.target.value,
              $options: "im",
            };
          }}
        ></TextField>
      ) : null;
      break;
    }
    case INPUT_TYPE.EMAIL: {
      filterNode = filter ? (
        <TextField
          fullWidth
          variant="outlined"
          label={field.label}
          name={field.db_field}
          onChange={(event) => {
            valueLastUpdatedRef.current = new Date();
            filterRef.current[`${categoryName}.${field.db_field}`] = {
              $regex: event.target.value,
              $options: "im",
            };
          }}
        ></TextField>
      ) : null;
      break;
    }
    case INPUT_TYPE.SELECT: {
      filterNode = filter ? (
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Select the options</FormLabel>
          <FormGroup>
            {field.options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox name={option} />}
                label={option}
                onChange={(event) => {
                  valueLastUpdatedRef.current = new Date();
                  if (
                    !!filterRef.current[`${categoryName}.${field.db_field}`] &&
                    !!filterRef.current[`${categoryName}.${field.db_field}`]["$in"]
                  ) {
                    if (event.target.checked)
                      filterRef.current[`${categoryName}.${field.db_field}`]["$in"].push(option);
                    else
                      filterRef.current[`${categoryName}.${field.db_field}`]["$in"] =
                        filterRef.current[`${categoryName}.${field.db_field}`]["$in"].filter(
                          (item) => item !== option
                        );
                  } else {
                    filterRef.current[`${categoryName}.${field.db_field}`] = { $in: [option] };
                  }
                }}
              />
            ))}
          </FormGroup>
          {/*           <FormHelperText>Be careful</FormHelperText> */}
        </FormControl>
      ) : null;
      break;
    }
  }

  const outputNode = (
    <Fragment>
      <Typography color="textSecondary" gutterBottom>
        {field.label}
      </Typography>
      {actions}
      {filterNode}
      {sortNode}
    </Fragment>
  );

  return outputNode;
};

export default FilterNode;

{
  /* {sort ? (
          <TextField
            id={field.db_field}
            fullWidth
            select
            label={"Sort By"}
            name={field.db_field}
            onChange={(event) => {
              valueLastUpdatedRef.current = new Date();
              sortRef.current[categoryName][field.db_field] = event.target.value;
              console.log("value: ", value);
            }}
          >
            <MenuItem value={"Ascending"}>{"Ascending"}</MenuItem>
            <MenuItem value={"Descending"}>{"Descending"}</MenuItem>
             <MenuItem value={"Ascending Length"}>{"Ascending Length"}</MenuItem>
            <MenuItem value={"Descending Length"}>{"Descending Length"}</MenuItem> 
          </TextField>
        ) : null} */
}

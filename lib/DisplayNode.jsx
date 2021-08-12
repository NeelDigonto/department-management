import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Fragment } from "react";
import { isEmptyObject } from "../lib/util";

const DisplayNode = ({ field, value }) => {
  const label = field.label;
  /*   const value = publication[field.db_field]; */
  let outputNode;
  if (field.type === "boolean")
    outputNode = (
      /*       <Grid item xs={12} lg={6} key={field.db_field}> */
      <Fragment>
        <Typography color="textSecondary" gutterBottom>
          {label}
        </Typography>
        {!!value && value ? "Yes" : "No"}
      </Fragment>
    );
  else if (field.type === "string" || field.type === "date" || field.type === "number")
    outputNode = (
      <Fragment>
        <Typography color="textSecondary" gutterBottom>
          {label}
        </Typography>
        {!!value ? value : null}
      </Fragment>
    );
  else if (field.input_type === "file" && field.type === "object") {
    outputNode = (
      <Fragment>
        {label + " "}
        {!isEmptyObject(value) ? (
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              window.open("/api/file/get/" + value.fuid, "_blank");
            }}
          >
            {value.fname}
          </Button>
        ) : (
          " No file Uploaded"
        )}
      </Fragment>
    );
  } else outputNode = <Fragment></Fragment>;
  return outputNode;
};

export default DisplayNode;

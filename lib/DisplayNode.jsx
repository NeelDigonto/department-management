import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Fragment } from "react";
import { isEmptyObject } from "../lib/util";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE } from "../data/types/types";

const DisplayNode = ({ field, value }) => {
  const label = field.label;
  /*   const value = publication[field.db_field]; */
  let outputNode;
  if (field.type === VALUE_TYPE.BOOLEAN)
    outputNode = (
      /*       <Grid item xs={12} lg={6} key={field.db_field}> */
      <Fragment>
        <Typography color="textSecondary" gutterBottom>
          {label}
        </Typography>
        {!!value && value ? "Yes" : "No"}
      </Fragment>
    );
  else if (
    field.type === VALUE_TYPE.STRING ||
    field.type === VALUE_TYPE.DATE ||
    field.type === VALUE_TYPE.NUMBER
  )
    outputNode = (
      <Fragment>
        <Typography color="textSecondary" gutterBottom>
          {label}
        </Typography>
        {!!value ? value : null}
      </Fragment>
    );
  else if (field.type === VALUE_TYPE.OBJECT && field.input_type === INPUT_TYPE.FILE) {
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

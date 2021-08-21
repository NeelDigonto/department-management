import React from "react";
import { Grid, Typography, Button, Link as MuiLink } from "@material-ui/core";
import { Fragment } from "react";
import { isEmptyObject } from "../../lib/util";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE } from "../../data/types/types";

const getTrimmedFileName = (org_fname, max_fname_len) => {
  if (org_fname.length > max_fname_len) {
    const f_ext_ind = org_fname.lastIndexOf(".");
    const f_ext = org_fname.substring(f_ext_ind);

    const new_fname = org_fname.substring(0, f_ext_ind).substring(0, max_fname_len - f_ext.length);
    return new_fname + ".." + f_ext;
  } else {
    return org_fname;
  }
};

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
  else if (field.type === VALUE_TYPE.STRING || field.type === VALUE_TYPE.DATE)
    outputNode = (
      <Fragment>
        <Typography color="textSecondary" gutterBottom>
          {label}
        </Typography>
        {!!value ? value : null}
      </Fragment>
    );
  else if (field.type === VALUE_TYPE.NUMBER)
    outputNode = (
      <Fragment>
        <Typography color="textSecondary" gutterBottom>
          {label}
        </Typography>
        {value !== "undefined" || value !== null ? value : null}
      </Fragment>
    );
  else if (field.type === VALUE_TYPE.OBJECT && field.input_type === INPUT_TYPE.FILE) {
    outputNode = (
      <Fragment>
        <Typography color="textSecondary" gutterBottom>
          {label}
        </Typography>
        {!isEmptyObject(value) ? (
          <MuiLink
            /* rel="noopener noreferrer" */ href={"/api/file/get/" + value.fuid}
            target="_blank"
          >
            {/* getTrimmedFileName(value.fname, 20) */ value.fname}
          </MuiLink>
        ) : (
          " No file Uploaded"
        )}
      </Fragment>
    );
  } else outputNode = <Fragment></Fragment>;
  return outputNode;
};

export default DisplayNode;

/*
onClick={() => {
  window.open("/api/file/get/" + value.fuid, "_blank");
}}*/

import React from "react";
import { Fragment } from "react";
import { schema } from "../../data/schema";
import { Card, Button, CardContent, Grid, Typography } from "@material-ui/core";
import DisplayNode from "../../lib/DisplayNode";

const DisplayPublication = ({ publication, index }) => {
  const info_content = () => (
    <Fragment>
      {schema["Publications"]["fields"].map((field, index) => {
        const value = publication[field.db_field];
        return (
          <Grid item xs={12} lg={6} key={field.db_field}>
            <DisplayNode field={field} value={value}></DisplayNode>
          </Grid>
        );
      })}
    </Fragment>
  );

  return <Grid container>{info_content()}</Grid>;
};

export default DisplayPublication;

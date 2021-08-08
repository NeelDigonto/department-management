import React from "react";
import { Fragment } from "react";
import { schema } from "../../data/schema";
import { v4 as uuidv4 } from "uuid";
import { Card, Button, CardContent, Grid, Typography } from "@material-ui/core";
import { isEmptyObject } from "../../lib/util";

const DisplayPublication = ({ publication, index }) => {
  const info_content = () => (
    <Fragment>
      {schema["Publications"]["fields"].map((item, index) => {
        const label = item.label;
        const value = publication[item.db_field];

        if (item.type === "boolean")
          return (
            <Grid item xs={12} lg={6} key={item.db_field}>
              <Typography color="textSecondary" gutterBottom>
                {label}
              </Typography>
              {!!value && value ? "Yes" : "No"}
            </Grid>
          );
        else if (item.type === "string" || item.type === "date" || item.type === "number")
          return (
            <Grid item xs={12} lg={6} key={item.db_field}>
              <Typography color="textSecondary" gutterBottom>
                {label}
              </Typography>
              {!!value ? value : null}
            </Grid>
          );
        else if (item.input_type === "file" && item.type === "object") {
          return (
            <Grid item xs={12} lg={6} key={item.db_field}>
              {label + " : "}
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
            </Grid>
          );
        } else return null;
      })}
    </Fragment>
  );

  return <Grid container>{info_content()}</Grid>;
};

export default DisplayPublication;

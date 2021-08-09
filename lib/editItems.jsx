import React, { Fragment } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Card,
  Button,
} from "@material-ui/core";

import { DeleteIcon } from "@material-ui/icons";
import { useFormik } from "formik";

const getEditNode = ({ field, formik }) => {
  let outputNode;
  switch (field.input_type) {
    case "text": {
      outputNode = (
        <Grid item xs={12} md={6} key={field.db_field}>
          <TextField
            fullWidth
            key={field.db_field}
            variant="filled"
            label={field.label}
            name={field.db_field}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[field.db_field]}
          ></TextField>
        </Grid>
      );
      break;
    }

    case "date": {
      outputNode = (
        <Grid item xs={12} md={6} key={field.db_field}>
          <TextField
            fullWidth
            key={field.db_field}
            type="date"
            label={field.label}
            name={field.db_field}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[field.db_field]}
          />
        </Grid>
      );
      break;
    }
    case "select": {
      outputNode = (
        <Grid item xs={12} md={6} key={field.db_field}>
          <FormControl key={field.db_field} fullWidth>
            <InputLabel id={field.db_fiel}>{field.label}</InputLabel>
            <Select
              labelId={field.db_fiel}
              id={field.db_field}
              value={formik.values[field.db_field]}
              name={field.db_field}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {field.options.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      );
      break;
    }
    case "checkbox": {
      outputNode = (
        <Grid item xs={12} md={6} key={field.db_field}>
          <FormControlLabel
            key={field.db_field}
            control={
              <Checkbox
                checked={formik.values[field.db_field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name={field.db_field}
                color="primary"
              />
            }
            label={field.label}
          />
        </Grid>
      );
      break;
    }
    case "file": {
      const value = formik.values[field.db_field];
      const isNull = isEmptyObject(value);
      outputNode = (
        <Grid item xs={12} md={6} key={field.db_field}>
          {!isNull ? (
            <Card>
              {field.label}
              <Button
                varient="contained"
                color="primary"
                component="span"
                onClick={() => window.open("/api/file/get/" + value.fuid, "_blank")}
              >
                {value.fname}
              </Button>
              <Button
                endIcon={<DeleteIcon />}
                onClick={() => {
                  formik.setFieldValue(field.db_field, {});
                }}
              ></Button>
            </Card>
          ) : (
            <Fragment>
              <input
                hidden
                id={field.db_field}
                type="file"
                name={field.db_field}
                /* value={formik.values[field.db_field]} */
                accept={field.input_range}
                onBlur={formik.handleBlur}
                onChange={async (event) => {
                  const file = event.currentTarget.files[0];
                  stageFileUpload(file, (file_obj) => {
                    formik.setFieldValue(field.db_field, {
                      fname: file_obj.fname,
                      fuid: file_obj.fuid,
                    });
                  });
                  /*       setFile(event.currentTarget.files[0]); */
                }}
              />
              <label htmlFor={field.db_field}>
                {field.label}
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
            </Fragment>
          )}
        </Grid>
      );
      break;
    }
    default:
      null;
  }

  return outputNode;
};

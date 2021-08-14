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
  FormHelperText,
  makeStyles,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { isEmptyObject } from "./util";
import stageFileUpload from "./fileUpload";
import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE } from "../data/types/types";

const useStyles = makeStyles((theme) => ({ errorBody: { color: theme.palette.error.main } }));

const EditNode = ({ field, formik, setIsUploading }) => {
  const classes = useStyles();
  let outputNode;
  switch (field.input_type) {
    case INPUT_TYPE.TEXT: {
      outputNode = (
        <TextField
          error={!!formik.errors[field.db_field] && formik.touched[field.db_field]}
          helperText={formik.errors[field.db_field]}
          fullWidth
          variant="filled"
          label={field.label}
          name={field.db_field}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[field.db_field]}
        ></TextField>
      );
      break;
    }
    case INPUT_TYPE.DATE: {
      outputNode = (
        <TextField
          error={!!formik.errors[field.db_field] && formik.touched[field.db_field]}
          helperText={formik.errors[field.db_field]}
          fullWidth
          key={field.db_field}
          type="date"
          label={field.label}
          name={field.db_field}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[field.db_field]}
        />
      );
      break;
    }
    case INPUT_TYPE.SELECT: {
      outputNode = (
        <FormControl
          fullWidth
          error={!!formik.errors[field.db_field] && formik.touched[field.db_field]}
        >
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
          <FormHelperText>{formik.errors[field.db_field]}</FormHelperText>
        </FormControl>
      );
      break;
    }
    case INPUT_TYPE.CHECKBOX: {
      outputNode = (
        <FormControlLabel
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
      );
      break;
    }
    case INPUT_TYPE.EMAIL: {
      outputNode = (
        <TextField
          error={!!formik.errors[field.db_field] && formik.touched[field.db_field]}
          helperText={formik.errors[field.db_field]}
          fullWidth
          variant="filled"
          label={field.label}
          name={field.db_field}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[field.db_field]}
        ></TextField>
      );
      break;
    }
    case INPUT_TYPE.FILE: {
      const value = formik.values[field.db_field];
      const isNull = isEmptyObject(value);
      outputNode = !isNull ? (
        <Fragment>
          {field.label}
          <Card>
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
        </Fragment>
      ) : (
        <Fragment>
          <input
            hidden
            id={field.db_field}
            type="file"
            name={field.db_field}
            accept={field.input_range}
            onBlur={formik.handleBlur}
            onChange={async (event) => {
              const file = event.currentTarget.files[0];
              stageFileUpload(file, setIsUploading, (file_obj) => {
                formik.setFieldValue(field.db_field, {
                  fname: file_obj.fname,
                  fuid: file_obj.fuid,
                });
              });
            }}
          />
          <label htmlFor={field.db_field}>
            {field.label}
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </Fragment>
      );
      outputNode = (
        <Fragment>
          {outputNode}
          {!!formik.errors[field.db_field] && formik.touched[field.db_field] ? (
            <div className={classes.errorBody}>{`${field.label} must not be empty`}</div>
          ) : null}
        </Fragment>
      );
      break;
    }
    default: {
      console.error('Unrecognized field passed to "getEditNode"');
      outputNode = <Fragment></Fragment>;
    }
  }
  return outputNode;
};

export default EditNode;

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
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { isEmptyObject } from "./util";
import stageFileUpload from "./fileUpload";

const EditNode = ({ field, formik, setIsUploading }) => {
  let outputNode;
  switch (field.input_type) {
    case "text": {
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
    case "date": {
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
    case "select": {
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
    case "checkbox": {
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
    case "email": {
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
    case "file": {
      const value = formik.values[field.db_field];
      const isNull = isEmptyObject(value);
      outputNode = !isNull ? (
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

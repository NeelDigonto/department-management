import React, { Fragment } from "react";
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Card,
  Button,
  FormHelperText,
  Grid,
  makeStyles,
} from "@material-ui/core";

import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE } from "../../data/types/types";
import CustomSelect from "../ui/CustomSelect";
import FileEdit from "../ui/FileEdit";

const EditNode = ({ field, formik, setIsUploading }) => {
  let outputNode;
  switch (field.input_type) {
    case INPUT_TYPE.TEXT: {
      outputNode = (
        <TextField
          error={!!formik.errors[field.db_field] && formik.touched[field.db_field]}
          helperText={!!formik.errors[field.db_field] ? formik.errors[field.db_field] : field.info}
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
    case INPUT_TYPE.MULTILINE_TEXT: {
      outputNode = (
        <TextField
          error={!!formik.errors[field.db_field] && formik.touched[field.db_field]}
          helperText={!!formik.errors[field.db_field] ? formik.errors[field.db_field] : field.info}
          fullWidth
          multiline
          rows={2}
          rowsMax={Infinity}
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
    case INPUT_TYPE.NUMBER: {
      outputNode = (
        <TextField
          error={!!formik.errors[field.db_field] && formik.touched[field.db_field]}
          helperText={!!formik.errors[field.db_field] ? formik.errors[field.db_field] : field.info}
          fullWidth
          variant="filled"
          type="number"
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
          helperText={!!formik.errors[field.db_field] ? formik.errors[field.db_field] : field.info}
          fullWidth
          key={field.db_field}
          type="date"
          label={field.label}
          name={field.db_field}
          onChange={(e) => {
            console.log(e.target.value);
            formik.setFieldValue(field.db_field, e.target.value);
          }}
          onBlur={formik.handleBlur}
          value={formik.values[field.db_field]}
        />
      );
      break;
    }
    case INPUT_TYPE.SELECT: {
      outputNode = (
        <TextField
          id={field.db_field}
          error={!!formik.errors[field.db_field] && formik.touched[field.db_field]}
          helperText={!!formik.errors[field.db_field] ? formik.errors[field.db_field] : field.info}
          fullWidth
          select
          label={field.label}
          name={field.db_field}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[field.db_field]}
        >
          {field.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      );
      break;
    }
    case INPUT_TYPE.CUSTOM_SELECT: {
      outputNode = <CustomSelect field={field} formik={formik} />;
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
        ></FormControlLabel>
      );
      break;
    }
    case INPUT_TYPE.EMAIL: {
      outputNode = (
        <TextField
          error={!!formik.errors[field.db_field] && formik.touched[field.db_field]}
          helperText={!!formik.errors[field.db_field] ? formik.errors[field.db_field] : field.info}
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
      outputNode = <FileEdit {...{ formik, field, setIsUploading }} />;
      break;
    }
    default: {
      console.error('Unrecognized field passed to "getEditNode"' + field.input_type);
      outputNode = <Fragment></Fragment>;
    }
  }
  return outputNode;
};

export default EditNode;

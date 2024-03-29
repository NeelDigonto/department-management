import React, { Fragment } from "react";
import { TextField, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";

import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE } from "@data/types/types";
import CustomSelect from "@components/ui/CustomSelect";
import FileEdit from "@components/ui/FileEdit";
import { isValidDate } from "@lib/util";

const getISO8601DateFormat = (dateIsoString) => {
  const date = new Date(dateIsoString);
  if (isValidDate(date)) return date.toISOString().split("T")[0];
  else "";
};

const EditNode = ({ field, formik, setIsUploading }) => {
  let outputNode;
  switch (field.input_type) {
    case INPUT_TYPE.TEXT: {
      outputNode = (
        <TextField
          error={
            !!formik.errors[field.db_field] && formik.touched[field.db_field]
          }
          helperText={
            !!formik.errors[field.db_field]
              ? formik.errors[field.db_field]
              : field.info
          }
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
          error={
            !!formik.errors[field.db_field] && formik.touched[field.db_field]
          }
          helperText={
            !!formik.errors[field.db_field]
              ? formik.errors[field.db_field]
              : field.info
          }
          fullWidth
          multiline
          minRows={2}
          maxRows={Infinity}
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
          error={
            !!formik.errors[field.db_field] && formik.touched[field.db_field]
          }
          helperText={
            !!formik.errors[field.db_field]
              ? formik.errors[field.db_field]
              : field.info
          }
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
        <Fragment>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              /*   error={
                !!formik.errors[field.db_field] &&
                formik.touched[field.db_field]
              }
              helperText={
                !!formik.errors[field.db_field]
                  ? formik.errors[field.db_field]
                  : field.info
              }
              fullWidth */
              label={field.label}
              name={field.db_field}
              /*  inputFormat="MM/dd/yyyy" */
              value={new Date(formik.values[field.db_field])}
              onChange={(newValue) => {
                console.log(newValue);
                formik.setFieldValue(field.db_field, newValue);
              }}
              onBlur={formik.handleBlur}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Fragment>
      );
      break;
    }
    case INPUT_TYPE.SELECT: {
      outputNode = (
        <TextField
          id={field.db_field}
          error={
            !!formik.errors[field.db_field] && formik.touched[field.db_field]
          }
          helperText={
            !!formik.errors[field.db_field]
              ? formik.errors[field.db_field]
              : field.info
          }
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
          error={
            !!formik.errors[field.db_field] && formik.touched[field.db_field]
          }
          helperText={
            !!formik.errors[field.db_field]
              ? formik.errors[field.db_field]
              : field.info
          }
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
      console.error(
        'Unrecognized field passed to "getEditNode"' + field.input_type
      );
      outputNode = <Fragment></Fragment>;
    }
  }
  return outputNode;
};

export default EditNode;

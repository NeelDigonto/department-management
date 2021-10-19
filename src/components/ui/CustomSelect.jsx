import React, { Fragment, useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";

const CustomSelect = ({ formik, field }) => {
  const [selectItem, setSelectItem] = useState(
    field.options.find((value) => value === formik.values[field.db_field])
      ? formik.values[field.db_field]
      : "OTHER"
  );
  const [textValue, setTextValue] = useState(formik.values[field.db_field]);

  useEffect(() => {
    if (selectItem !== "OTHER") {
      formik.setFieldValue(field.db_field, selectItem);
    } else {
      formik.setFieldValue(field.db_field, textValue);
    }
  }, [
    selectItem,
    textValue,
    setSelectItem,
    setTextValue,
    field.db_field,
    formik.setFieldValue,
  ]);

  return (
    <Fragment>
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
        select
        label={field.label}
        name={field.db_field}
        onChange={(event) => {
          const value = event.target.value;
          setSelectItem(value);
        }}
        onBlur={formik.handleBlur}
        value={selectItem}
      >
        {[...field.options, "OTHER"].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {selectItem === "OTHER" ? (
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
          onChange={(event) => {
            const value = event.target.value;
            setTextValue(value);
          }}
          onBlur={formik.handleBlur}
          value={textValue}
        ></TextField>
      ) : null}
    </Fragment>
  );
};

export default CustomSelect;

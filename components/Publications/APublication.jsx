import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import PublicationCard from "./PublicationCard";
import styles from "./APublication.module.css";

import { useUserContext } from "../../contexts/UserContext";
import { Formik, useFormik, Field, Form, ErrorMessage } from "formik";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  StylesProvider,
} from "@material-ui/core";
import * as Yup from "yup";
import { schema } from "../../data/schema";
import InfoField from "./Field/InfoField";

const APublication = ({ element, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useUserContext();

  const formik = useFormik({
    initialValues: element,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      axios({
        url: "api/user/editData/publications/edit",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          employeeID: user.employeeID,
          pub_sl_no_to_update: element.sl_no,
          updateObject: values,
        },
      })
        .then((response) => response.data)
        .then((result) => {
          v;
          if (result.isUpdated === true) {
            setUser((oldState) => {
              let newState = { ...oldState };
              newState["Publications"][index] = {
                ...newState["Publications"][index],
                ...values,
              };
              return newState;
            });
          }
        })
        .then(() => {
          setSubmitting(false);
          setIsEditing(false);
        });
    },
  });

  const deletePublicationHandler = (sl_no_to_delete) => {
    fetch("api/user/editData/publications/delete", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeID: user.employeeID, delete_sl_no: sl_no_to_delete }),
    })
      .then((respone) => respone.json())
      .then((result) => {
        if (result.deleted) {
          setUser((oldState) => {
            let newState = { ...oldState };
            newState["Publications"] = newState["Publications"].filter(
              (item) => item.sl_no !== sl_no_to_delete
            );
            return newState;
          });
        } else {
          console.error("pub not deleted");
          console.log(result.updateResult);
        }
      });
  };

  const info_content = (
    <div className={styles.APublication__info_box_grid_layout}>
      {schema["Publications"]["fields"].map((item, index) => {
        const label = item.label;
        const value = element[item.db_field];
        if (item.type === "boolean")
          return (
            <InfoField key={item.db_field} label={label} value={!!value && value ? "Yes" : "No"} />
          );
        else if (item.type === "string" || item.type === "date" || item.type === "number")
          return <InfoField key={item.db_field} label={label} value={!!value ? value : null} />;
        else if (item.type === "file")
          return (
            <InfoField
              key={item.db_field}
              label={label}
              value={
                !!value ? (
                  <Button variant="contained" size="small">
                    {value.file_name}
                  </Button>
                ) : null
              }
            />
          );
        else return null;
      })}
    </div>
  );

  const edit_content = (
    <form
      onSubmit={formik.handleSubmit}
      className={styles.APublication__form_layout}
      encType="multipart/form-data"
    >
      {schema["Publications"]["fields"].map((field) => {
        switch (field.input_type) {
          case "text":
            return (
              <TextField
                key={field.db_field}
                variant="filled"
                label={field.label}
                name={field.db_field}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.db_field]}
              ></TextField>
            );
          case "date":
            return (
              <TextField
                key={field.db_field}
                type="date"
                label={field.label}
                name={field.db_field}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.db_field]}
              />
            );
          case "select":
            return (
              <FormControl key={field.db_field}>
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
            );
          case "checkbox":
            return (
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
            );
          case "file":
            return (
              <div style={{ width: "auto" }} key={field.db_field}>
                <input
                  hidden
                  id="upload-inv-file"
                  type="file"
                  name={field.db_field}
                  /* value={formik.values[field.db_field]} */
                  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    formik.setFieldValue(field.db_field, event.currentTarget.files[0]);
                  }}
                />
                <label htmlFor="upload-inv-file">
                  Proof Of Invitation File
                  <Button
                    style={{ marginLeft: "2rem" }}
                    variant="contained"
                    color="primary"
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
              </div>
            );
          default:
            null;
        }
      })}
    </form>
  );

  return (
    <Fragment>
      {!isEditing ? (
        <PublicationCard
          content={info_content}
          sl_no={element.sl_no}
          right_upper_btn={{
            label: "Edit",
            type: "button",
            handleClick: () => {
              setIsEditing(true);
            },
          }}
          right_lower_btn={{
            label: "Delete",
            handleClick: () => {
              deletePublicationHandler(element.sl_no);
            },
          }}
        />
      ) : (
        <PublicationCard
          content={edit_content}
          sl_no={element.sl_no}
          right_upper_btn={{
            label: "Apply",
            type: "submit",
            handleClick: () => {
              formik.handleSubmit();
            },
          }}
          right_lower_btn={{
            label: "Cancel",
            type: "button",
            handleClick: () => {
              setIsEditing(false);
            },
          }}
        />
      )}
    </Fragment>
  );
};

export default APublication;

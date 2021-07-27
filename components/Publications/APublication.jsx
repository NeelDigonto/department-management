import React, { Fragment, useState, useEffect } from "react";
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

import { PublicationSchema } from "./PublicationSchema";
import InfoField from "./Field/InfoField";

const APublication = ({ element, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useUserContext();

  const formik = useFormik({
    initialValues: element,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      fetch("api/user/editData/publications/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeID: user.employeeID,
          pub_sl_no_to_update: element.sl_no,
          updateObject: values,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
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

  const currentPublication = element;
  const name_of_auth = currentPublication["name_of_auth"];
  const yop = currentPublication["yop"];
  const title = currentPublication["title"];
  const journal_name = currentPublication["journal_name"];
  const nat_inter_imp = currentPublication["nat_inter_imp"];
  const impact_factor = currentPublication["impact_factor"];
  const vol_issue_no = currentPublication["vol_issue_no"];
  const issn_isbn = currentPublication["issn_isbn"];
  const indexing = currentPublication["indexing"];
  const inv_paper = currentPublication["inv_paper"];
  // const prof_inv_file = currentPublication["prof_inv_file"];
  const studs_involved = currentPublication["studs_involved"];

  const info_content = (
    <div className={styles.APublication__info_box_grid_layout}>
      <InfoField label={"Author's Name"} value={name_of_auth} />
      <InfoField label={"Published on"} value={yop} />
      <InfoField label={"Title"} value={title} />
      <InfoField label={"Journal"} value={journal_name} />
      <InfoField label={"Coverage"} value={nat_inter_imp} />
      <InfoField label={"Impact"} value={impact_factor} />
      <InfoField label={"Volume No/Issue No. & Page No"} value={vol_issue_no} />
      <InfoField label={"ISSN/ISBN"} value={issn_isbn} />
      <InfoField label={"Indexing"} value={indexing} />
      <InfoField label={"Invited Paper"} value={!!inv_paper && inv_paper ? "Yes" : "No"} />
      {/*  <InfoField label={"Proof of Invitation"} value={prof_inv_file} /> */}
      <InfoField label={"Students Involved"} value={studs_involved} />
    </div>
  );

  const edit_content = (
    <form onSubmit={formik.handleSubmit} className={styles.APublication__form_layout}>
      {PublicationSchema.map((field) => {
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
          case "checkbox": {
            console.log("Formik:", formik.values[field.db_field]);
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
          }
          default:
            null;
        }
      })}
    </form>
  );

  console.log(user["Publications"][index].inv_paper);

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

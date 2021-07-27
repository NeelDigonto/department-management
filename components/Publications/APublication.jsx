import React, { Fragment, useState, useEffect } from "react";
import PublicationCard from "./PublicationCard";
import styles from "./APublication.module.css";

import { useUserContext } from "../../contexts/UserContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TextField, Button, StylesProvider } from "@material-ui/core";
import * as Yup from "yup";

import { PublicationSchema } from "./PublicationSchema";
import InfoField from "./Field/InfoField";

const APublication = ({ element }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useUserContext();

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
      <InfoField label={"Invited Paper"} value={inv_paper ? "Yes" : "No"} />
      {/*  <InfoField label={"Proof of Invitation"} value={prof_inv_file} /> */}
      <InfoField label={"Students Involved"} value={studs_involved} />
    </div>
  );

  const edit_content = (
    <Formik initialValues={element} onSubmit={() => {}}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form className={styles.APublication__form_layout}>
          {PublicationSchema.map((field) => {
            switch (field.input_type) {
              case "text":
                return (
                  <TextField
                    variant="filled"
                    label={field.label}
                    name={field.db_field}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[field.db_field]}
                  ></TextField>
                );
              case "date":
                return (
                  <TextField
                    type="date"
                    label={field.label}
                    name={field.db_field}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[field.db_field]}
                  />
                );
              default:
                null;
            }
          })}
        </Form>
      )}
    </Formik>
  );

  return (
    <Fragment>
      {!isEditing ? (
        <PublicationCard
          content={info_content}
          sl_no={element.sl_no}
          right_upper_btn={{
            label: "Edit",
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
            handleClick: () => {},
          }}
          right_lower_btn={{
            label: "Cancel",
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

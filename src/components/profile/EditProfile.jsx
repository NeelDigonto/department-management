import React, { Fragment, useState, useEffect } from "react";
import { Formik, useFormik, Field, Form, ErrorMessage } from "formik";
import { ReasonPhrases, StatusCodes, getReasonPhrase } from "http-status-codes";

import { useUserContext } from "../../contexts/UserContext";
import EditNode from "../nodes/EditNode";
import { MASTER_SCHEMA, getValidationSchema } from "../../data/schema";
import axios from "axios";
import {
  makeStyles,
  Grid,
  ButtonGroup,
  Button,
  Box,
  Card,
  CardContent,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const EditProfile = ({ setIsEditing }) => {
  const { user, setUser } = useUserContext();
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: user["profile"],
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      fetch(`api/user/${user.employeeID}/data/edit/profile/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newProfile: values,
        }),
      })
        .then((response) => {
          if (response.status === StatusCodes.OK) {
            return response.json();
          } else {
            console.warn("Couldn't update Profile");
            throw `Server responded with: ${getReasonPhrase(response.status)}`;
          }
        })
        .then((result) => {
          setUser((oldState) => {
            let newState = { ...oldState };
            newState["profile"] = {
              ...result.updatedProfile,
            };
            return newState;
          });
          setSubmitting(false);
          setIsEditing(false);
        });
    },
    validationSchema: getValidationSchema("profile"),
  });

  useEffect(() => {
    if (isUploading || formik.isSubmitting) setOpen(true);
    else setOpen(false);
  }, [isUploading, formik.isSubmitting]);

  const getFormNode = (
    <form onSubmit={formik.handleSubmit} /* encType="multipart/form-data" */>
      <Card>
        <CardContent>
          <Grid container>
            {MASTER_SCHEMA["profile"].map((field) => (
              <Grid item xs={12} md={6} key={field.db_field}>
                <Box px={0.5} py={0.5}>
                  <EditNode
                    field={field}
                    formik={formik}
                    setIsUploading={setIsUploading}
                  ></EditNode>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </form>
  );

  return (
    <Fragment>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {getFormNode}
      <Box pt={2}>
        <ButtonGroup fullWidth>
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Apply
          </Button>
        </ButtonGroup>
      </Box>
    </Fragment>
  );
};

export default EditProfile;

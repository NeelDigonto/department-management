import React, { Fragment, useState, useEffect } from "react";
import { Formik, useFormik, Field, Form, ErrorMessage } from "formik";

import { useUserContext } from "../../contexts/UserContext";
import EditNode from "../../lib/EditNode";
import { MASTER_SCHEMA, getProfileValidationSchema } from "../../data/schema";
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
      axios({
        url: "api/user/editData/profile/edit",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          employeeID: user.employeeID,
          newProfile: values,
        },
      })
        .then((response) => response.data)
        .then((result) => {
          if (result.isUpdated === true) {
            setUser((oldState) => {
              let newState = { ...oldState };
              newState["profile"] = {
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
    validationSchema: getProfileValidationSchema(),
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

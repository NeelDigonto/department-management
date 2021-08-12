import React from "react";
import { Fragment, useState, useEffect } from "react";
import { schema, getPublicationValidationSchema } from "../../data/schema";
import { useUserContext } from "../../contexts/UserContext";
import axios from "axios";
import { Button, Grid, Box, makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import { useFormik } from "formik";
import EditNode from "../../lib/EditNode";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const EditPublication = ({ publication, index, setIsEditing }) => {
  const classes = useStyles();
  const { user, setUser } = useUserContext();
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: publication,
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
          pub_sl_no_to_update: publication.sl_no,
          updateObject: values,
        },
      })
        .then((response) => response.data)
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
    validationSchema: getPublicationValidationSchema(),
  });

  useEffect(() => {
    if (isUploading || formik.isSubmitting) setOpen(true);
    else setOpen(false);
  }, [isUploading, formik.isSubmitting]);

  const getFormNode = (
    <form onSubmit={formik.handleSubmit} /* encType="multipart/form-data" */>
      <Grid container>
        {schema["Publications"]["fields"].map((field) => (
          <Grid item xs={12} md={6} key={field.db_field}>
            <Box px={0.5} py={0.5}>
              <EditNode field={field} formik={formik} setIsUploading={setIsUploading}></EditNode>
            </Box>
          </Grid>
        ))}
      </Grid>
    </form>
  );

  return (
    <Fragment>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {getFormNode}
      <Box pt={2}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="default"
              fullWidth
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default EditPublication;

import React, { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Paper,
  Box,
  Alert as MuiAlert,
  Grid,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

const DeleteUser = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const snackbarAction = (key) => (
    <Button
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      {"Dismiss"}
    </Button>
  );

  return (
    <Paper>
      <Box px={2} py={2}>
        <Typography variant="h4">{"Add a New User"}</Typography>
        <Formik
          initialValues={{ employeeID: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            fetch(`/api/admin/delete_user/${values.employeeID}`, {
              method: "DELETE",
            })
              .then((response) =>
                response.status === StatusCodes.OK
                  ? enqueueSnackbar("User Removed Successfully", {
                      variant: "success",
                      action: snackbarAction,
                    })
                  : enqueueSnackbar("Couldn't remove user", {
                      variant: "error",
                      action: snackbarAction,
                    })
              )
              .then(setSubmitting(false));
          }}
        >
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
            <Form>
              <Grid container display="flex" justifyContent="space-around">
                <Grid item sm={12}>
                  <Box px={2} py={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      name="employeeID"
                      label="EmployeeID"
                      autoComplete=""
                      value={values.employeeID}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box pt={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {"Remove User"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Paper>
  );
};

export default DeleteUser;

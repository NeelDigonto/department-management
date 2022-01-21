import React from "react";
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
import { StatusCodes } from "http-status-codes";

const CreateUser = () => {
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
          initialValues={{ employeeID: "", password: "", name: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            fetch(`/api/admin/create_user/${values.employeeID}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                password: values.password,
                name: values.name,
              }),
            })
              .then((response) =>
                response.status === StatusCodes.OK ||
                response.status === StatusCodes.CREATED
                  ? enqueueSnackbar("User Created Successfully", {
                      variant: "success",
                      action: snackbarAction,
                    })
                  : enqueueSnackbar("Couldn't create user", {
                      variant: "error",
                      action: snackbarAction,
                    })
              )
              .then(() => setSubmitting(false));
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
                <Grid item sm={12} lg={6}>
                  <Box px={2} py={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      name="employeeID"
                      label="EmployeeID"
                      autoComplete="off"
                      value={values.employeeID}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item sm={12} lg={6}>
                  <Box px={2} py={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      name="name"
                      label="Name"
                      autoComplete="off"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item sm={12} lg={6}>
                  <Box px={2} py={2}>
                    <TextField
                      variant="filled"
                      fullWidth
                      name="password"
                      type="password"
                      label="Password"
                      autoComplete="new-password"
                      value={values.password}
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
                      {"Add User"}
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

export default CreateUser;

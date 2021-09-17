import React, { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Paper,
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from "http-status-codes";

const useStyles = makeStyles((theme) => ({
  info_msg: { color: theme.palette.error.main, textAlign: "center", padding: "1rem" },
}));
const CreateUser = () => {
  const [message, setMessage] = useState("");
  const classes = useStyles();

  return (
    <Paper>
      <Box px={2} py={2}>
        <h1>Add a New User</h1>
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
                response.status === StatusCodes.OK || response.status === StatusCodes.CREATED
                  ? setMessage("User Created Successfully")
                  : setMessage("Couldn't create user")
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
              <Grid container>
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
                      Add User
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Typography className={classes.info_msg} component="h2" variant="h5">
          {message}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CreateUser;

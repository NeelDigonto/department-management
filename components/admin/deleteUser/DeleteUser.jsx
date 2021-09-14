import React, { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Paper,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from "http-status-codes";

const useStyles = makeStyles((theme) => ({
  info_msg: { color: theme.palette.error.main, textAlign: "center", padding: "1rem" },
}));
const DeleteUser = () => {
  const [message, setMessage] = useState("");
  const classes = useStyles();

  return (
    <Paper>
      <Box px={2} py={2}>
        <h1>Remove a User</h1>
        <Formik
          initialValues={{ employeeID: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            fetch(`/api/admin/delete_user/${values.employeeID}`, {
              method: "DELETE",
            })
              .then((response) =>
                response.status === StatusCodes.OK
                  ? setMessage("User Removed Successfully")
                  : setMessage("Couldn't remove user")
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
                <Grid item sm={12}>
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
                <Grid item xs={12}>
                  <Box pt={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Remove User
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

export default DeleteUser;

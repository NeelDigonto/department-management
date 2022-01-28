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
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { StatusCodes } from "http-status-codes";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useUserContext } from "../../contexts/UserContext";
import Password from "./Password";

const CreateUser = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { user, setUser } = useUserContext();

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
    <Paper sx={{ m: 2 }}>
      {!!user ? (
        <Box px={2} py={2}>
          <Typography variant="h4">{"Change Password"}</Typography>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              newPasswordRepeat: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              fetch(
                `/api/user/${user["profile"]["employeeID"]}/data/edit/password/change`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword,
                  }),
                }
              )
                .then((response) =>
                  response.status === StatusCodes.OK ||
                  response.status === StatusCodes.CREATED
                    ? enqueueSnackbar("Password Changed Successfully", {
                        variant: "success",
                        action: snackbarAction,
                      })
                    : enqueueSnackbar("Couldn't Change Password", {
                        variant: "error",
                        action: snackbarAction,
                      })
                )
                .then(() => setSubmitting(false));
              setSubmitting(false);
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
                  <Box px={2} py={2}>
                    <Password
                      name="oldPassword"
                      label="Old Password"
                      autoComplete="off"
                      value={values.oldPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Password
                      name="newPassword"
                      label="New Password"
                      autoComplete="off"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Password
                      name="newPasswordRepeat"
                      label="New Password Repeat"
                      autoComplete="off"
                      value={values.newPasswordRepeat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Box>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit()}
                >
                  {"Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      ) : null}
    </Paper>
  );
};

export default CreateUser;

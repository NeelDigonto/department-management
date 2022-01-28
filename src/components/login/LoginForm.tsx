import React, { Fragment, useState } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Alert as MuiAlert,
} from "@mui/material";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import { useSnackbar } from "notistack";

interface LoginFormProps {
  loginType: string;
}

const LoginForm = ({ loginType }: LoginFormProps) => {
  const router = useRouter();
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

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const signInHandler = async () => {
      if (loginType === "faculty") {
        const result = await signIn("credentials", {
          redirect: false,
          employeeID: values.employeeID,
          password: values.password,
          isAdmin: false,
        });

        if (!result.error) {
          enqueueSnackbar("Welcome back!", {
            variant: "success",
            action: snackbarAction,
          });

          router.replace("/profile");
        } else {
          enqueueSnackbar("No user found!", {
            variant: "error",
            action: snackbarAction,
          });
        }
      } else {
        const result = await signIn("credentials", {
          redirect: false,
          adminID: values.adminID,
          password: values.password,
          isAdmin: true,
        });

        if (!result.error) {
          enqueueSnackbar("Welcome back!", {
            variant: "success",
            action: snackbarAction,
          });

          router.replace("/admin");
        } else {
          enqueueSnackbar("No such admin found!", {
            variant: "error",
            action: snackbarAction,
          });
        }
      }

      setSubmitting(false);
    };
    signInHandler();
  };

  return (
    <Fragment>
      <Formik
        initialValues={{ employeeID: "", adminID: "", password: "" }}
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 1 }}>
            {loginType === "faculty" ? (
              <TextField
                margin="normal"
                required
                variant="outlined"
                fullWidth
                id="employeeID"
                label="Employee ID"
                name="employeeID"
                value={values.employeeID}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete=""
                autoFocus
              />
            ) : (
              <TextField
                margin="normal"
                required
                variant="outlined"
                fullWidth
                id="adminID"
                label="Admin ID"
                name="adminID"
                value={values.adminID}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete=""
                autoFocus
              />
            )}
            <TextField
              margin="normal"
              required
              variant="outlined"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              disabled={isSubmitting}
              onClick={() => {
                handleSubmit();
              }}
            >
              {"Sign In"}
            </Button>
          </Box>
        )}
      </Formik>
    </Fragment>
  );
};

export default LoginForm;

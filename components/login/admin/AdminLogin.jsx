import React, { Fragment } from "react";
import Head from "next/head";
import { Formik, Form } from "formik";

import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import NextLink from "next/link";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AdminLogin = ({ setIsAdminLogin }) => {
  const router = useRouter();

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const signInHandler = async () => {
      const result = await signIn("credentials", {
        redirect: false,
        adminID: values.adminID,
        password: values.password,
        isAdmin: true,
      });
      if (!result.error) {
        // set some auth state
        router.replace("/admin/dashboard");
      } else {
        console.error(result.error);
      }
      setSubmitting(false);
    };
    signInHandler();
  };

  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Formik
        initialValues={{ adminID: "", password: "" }}
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="adminID"
              label="Admin ID"
              name="adminID"
              value={values.employeeID}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete=""
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
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
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {"Sign In (As Admin)"}
            </Button>
            <Grid container>
              <Grid item xs>
                <MuiLink href="#" variant="body2">
                  Forgot password?
                </MuiLink>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setIsAdminLogin((oldState) => !oldState);
                  }}
                >
                  {"Login as user"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminLogin;

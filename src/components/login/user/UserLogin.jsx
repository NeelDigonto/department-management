import React, { Fragment } from "react";
import Head from "next/head";
import { Formik, Form } from "formik";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link as MuiLink,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

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

const UserLogin = ({ setIsAdminLogin }) => {
  const router = useRouter();

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const signInHandler = async () => {
      const result = await signIn("credentials", {
        redirect: false,
        employeeID: values.employeeID,
        password: values.password,
        isAdmin: false,
      });

      if (!result.error) {
        // set some auth state
        router.replace("/profile");
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
        {"Sign in (User)"}
      </Typography>
      <Formik
        initialValues={{ employeeID: "", password: "" }}
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
              id="employeeID"
              label="Employee ID"
              name="employeeID"
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
              {"Sign In (As User)"}
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
                  {"Login as admin"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserLogin;

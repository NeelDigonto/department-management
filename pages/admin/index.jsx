import React, { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button } from "@material-ui/core";

const CreateUser = () => {
  const [message, setMessage] = useState("");

  return (
    <div style={{ margin: "10rem", padding: "2rem " }}>
      <h1>Add a New User</h1>
      <Formik
        initialValues={{ employeeID: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          fetch("/api/admin/createNewUser", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ employeeID: values.employeeID, password: values.password }),
          })
            .then((response) => response.json())
            .then((result) =>
              result.isCreated
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
            <TextField
              style={{ padding: "2rem" }}
              variant="filled"
              name="employeeID"
              value={values.employeeID}
              onChange={handleChange}
              onBlur={handleBlur}
            ></TextField>
            <TextField
              style={{ padding: "2rem" }}
              variant="filled"
              name="password"
              type="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            ></TextField>
            <Button
              style={{ "margin-top": "2rem", padding: "1rem" }}
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Add User
            </Button>
          </Form>
        )}
      </Formik>
      <h2 style={{ color: "red" }}>{message}</h2>
      <h2>I will make this page look better later</h2>
    </div>
  );
};

export default CreateUser;

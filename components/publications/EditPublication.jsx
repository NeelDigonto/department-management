import React from "react";
import { Fragment, useState, useEffect, useCallback } from "react";
import { schema } from "../../data/schema";
import { useUserContext } from "../../contexts/UserContext";
import axios from "axios";
import { isEmptyObject } from "../../lib/util";
import {
  Card,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  CardContent,
  Grid,
  FormControlLabel,
  Checkbox,
  Box,
  MenuItem,
  Typography,
  makeStyles,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Formik, useFormik, Field, Form, ErrorMessage } from "formik";
import DeleteIcon from "@material-ui/icons/Delete";

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
  const [file, setFile] = useState(null);

  const stageFileUpload = async (file, callbackFunc) => {
    if (!!file) {
      setIsUploading(true);
      setOpen(true);

      const handleFileUpload = async () => {
        let formData = new FormData();
        formData.append("file", file);
        const fuid = await axios({
          url: "/api/file/create",
          method: "POST",
          data: formData,
        })
          .then((response) => response.data)
          .then((result) => {
            return result.fuid;
          });
        return fuid;
      };

      const fuid = await handleFileUpload();

      setIsUploading(false);
      callbackFunc({ fname: file.name, fuid: fuid });
      setOpen(false);
    }
  };

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
  });

  console.log(formik.values);
  const getFormNode = (
    <form onSubmit={formik.handleSubmit} /* encType="multipart/form-data" */>
      <Grid container>
        {schema["Publications"]["fields"].map((field) => {
          switch (field.input_type) {
            case "text":
              return (
                <Grid item xs={12} md={6} key={field.db_field}>
                  <TextField
                    fullWidth
                    key={field.db_field}
                    variant="filled"
                    label={field.label}
                    name={field.db_field}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[field.db_field]}
                  ></TextField>
                </Grid>
              );
            case "date":
              return (
                <Grid item xs={12} md={6} key={field.db_field}>
                  <TextField
                    fullWidth
                    key={field.db_field}
                    type="date"
                    label={field.label}
                    name={field.db_field}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[field.db_field]}
                  />
                </Grid>
              );
            case "select":
              return (
                <Grid item xs={12} md={6} key={field.db_field}>
                  <FormControl key={field.db_field} fullWidth>
                    <InputLabel id={field.db_fiel}>{field.label}</InputLabel>
                    <Select
                      labelId={field.db_fiel}
                      id={field.db_field}
                      value={formik.values[field.db_field]}
                      name={field.db_field}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {field.options.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              );
            case "checkbox":
              return (
                <Grid item xs={12} md={6} key={field.db_field}>
                  <FormControlLabel
                    key={field.db_field}
                    control={
                      <Checkbox
                        checked={formik.values[field.db_field]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name={field.db_field}
                        color="primary"
                      />
                    }
                    label={field.label}
                  />
                </Grid>
              );
            case "file": {
              const value = formik.values[field.db_field];
              const isNull = isEmptyObject(value);
              return (
                <Grid item xs={12} md={6} key={field.db_field}>
                  {!isNull ? (
                    <Card>
                      {field.label}
                      <Button
                        varient="contained"
                        color="primary"
                        component="span"
                        onClick={() => window.open("/api/file/get/" + value.fuid, "_blank")}
                      >
                        {value.fname}
                      </Button>
                      <Button
                        endIcon={<DeleteIcon />}
                        onClick={() => {
                          formik.setFieldValue(field.db_field, {});
                        }}
                      ></Button>
                    </Card>
                  ) : (
                    <Fragment>
                      <input
                        hidden
                        id={field.db_field}
                        type="file"
                        name={field.db_field}
                        /* value={formik.values[field.db_field]} */
                        accept={field.input_range}
                        onBlur={formik.handleBlur}
                        onChange={async (event) => {
                          const file = event.currentTarget.files[0];
                          stageFileUpload(file, (file_obj) => {
                            formik.setFieldValue(field.db_field, {
                              fname: file_obj.fname,
                              fuid: file_obj.fuid,
                            });
                          });
                          /*       setFile(event.currentTarget.files[0]); */
                        }}
                      />
                      <label htmlFor={field.db_field}>
                        {field.label}
                        <Button variant="contained" color="primary" component="span">
                          Upload
                        </Button>
                      </label>
                    </Fragment>
                  )}
                </Grid>
              );
            }
            default:
              null;
          }
        })}
      </Grid>
    </form>
  );

  return (
    <Fragment>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {getFormNode}
      <Box>
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

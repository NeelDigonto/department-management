import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Fragment, useState, useEffect } from "react";
import { schema } from "../../data/schema";
import { useUserContext } from "../../contexts/UserContext";
import axios from "axios";
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
} from "@material-ui/core";
import { Formik, useFormik, Field, Form, ErrorMessage } from "formik";
import DeleteIcon from "@material-ui/icons/Delete";

const EditPublication = ({ publication, index, setIsEditing }) => {
  const { user, setUser } = useUserContext();
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    if (!!file) {
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

  useEffect(() => {
    const fileHandler = async () => {
      setIsUploading(true);
      const fuid = await handleFileUpload();
      console.log(fuid);

      //fix it fast
      formik.setFieldValue("prof_inv_file", {
        fname: file.name,
        fuid: fuid,
      });
      setIsUploading(false);
      setFile(null);
    };
    if (file) fileHandler();
  }, [file]);

  const getFormNode = (
    <form onSubmit={formik.handleSubmit} /* encType="multipart/form-data" */>
      <Grid container>
        {schema["Publications"]["fields"].map((field) => {
          switch (field.input_type) {
            case "text":
              return (
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    fullWidth
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
              const isNull =
                !!value && Object.keys(value).length === 0 && value.constructor === Object;
              console.log(value);
              return (
                <Grid item xs={12} md={6}>
                  {!isNull ? (
                    <Card>
                      {"Proof Of Invitation File"}
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
                        id="upload-inv-file"
                        type="file"
                        name={field.db_field}
                        /* value={formik.values[field.db_field]} */
                        onBlur={formik.handleBlur}
                        onChange={async (event) => {
                          setFile(event.currentTarget.files[0]);
                        }}
                      />
                      <label htmlFor="upload-inv-file">
                        {"Proof Of Invitation File"}
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
    <Card variant="outlined">
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default EditPublication;

import React, { Fragment, useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Grid, Box, Backdrop, CircularProgress } from "@mui/material";

import { MASTER_SCHEMA } from "../../data/schema";
import { useUserContext } from "../../contexts/UserContext";
import EditNode from "../nodes/EditNode";
import { editAchievementHandler } from "./handlers";

const EditAchievement = ({
  achievementCategory,
  getAchievementValidationSchema,
  achievement,
  index,
  setIsEditing,
}) => {
  const { user, setUser } = useUserContext();
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: achievement,
    onSubmit: async (values, { setSubmitting }) => {
      editAchievementHandler(
        user["profile"].employeeID,
        achievement.id,
        index,
        values,
        { setSubmitting },
        setUser,
        setIsEditing,
        achievementCategory
      );
    },
    validationSchema: getAchievementValidationSchema(),
  });

  useEffect(() => {
    if (isUploading || formik.isSubmitting) setOpen(true);
    else setOpen(false);
  }, [isUploading, formik.isSubmitting]);

  const getFormNode = (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        {MASTER_SCHEMA[achievementCategory]["fields"].map((field) => (
          <Grid item xs={12} md={6} key={field.db_field}>
            <Box px={0.5} py={0.5}>
              <EditNode
                field={field}
                formik={formik}
                setIsUploading={setIsUploading}
              ></EditNode>
            </Box>
          </Grid>
        ))}
      </Grid>
    </form>
  );

  return (
    <Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {getFormNode}
      <Box pt={2}>
        <Grid container>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                setIsEditing(false);
              }}
            >
              {"Cancel"}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              {"Save"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default EditAchievement;

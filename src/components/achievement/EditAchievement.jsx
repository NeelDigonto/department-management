import React, { Fragment, useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Button,
  Grid,
  Box,
  Backdrop,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

import { MASTER_SCHEMA } from "../../data/schema";
import { useUserContext } from "../../contexts/UserContext";
import EditNode from "../nodes/EditNode";
import { editAchievementHandler } from "./handlers";
import AchievementCard from "./AchievementCard";

const EditAchievement = ({
  achievementCategory,
  getAchievementValidationSchema,
  achievement,
  index,
  setIsEditing,
  expanded,
  setExpanded,
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

  const formNode = (
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
    <AchievementCard
      achievement={achievement}
      achievementIndex={index}
      achievementCategory={achievementCategory}
      setIsEditing={setIsEditing}
      {...{ expanded, setExpanded }}
      cardActions={
        <Fragment>
          <IconButton
            aria-label="cancel"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(false);
            }}
          >
            <CancelIcon />
          </IconButton>
          <IconButton
            aria-label="apply-changes"
            onClick={(e) => {
              e.stopPropagation();
              formik.handleSubmit();
            }}
          >
            <CheckIcon />
          </IconButton>
        </Fragment>
      }
      cardContent={
        <Fragment>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {formNode}
        </Fragment>
      }
    />
  );
};

export default EditAchievement;

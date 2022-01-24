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

import { ACHIEVEMENTS_SCHEMA_MAP } from "../../data/schema";
import { useUserContext } from "../../contexts/UserContext";
import EditNode from "../nodes/EditNode";
import {
  createAchievementFinalizeHandler,
  editAchievementHandler,
} from "./handlers";
import AchievementCard from "./AchievementCard";

interface EditAchievementProps {
  achievementCategory: string;
  getAchievementValidationSchema: any;
  achievement: any;
  index: number;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreatingAchievement: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAchievement = ({
  achievementCategory,
  getAchievementValidationSchema,
  achievement,
  index,
  setIsEditing,
  expanded,
  setExpanded,
  setIsCreatingAchievement,
}: EditAchievementProps) => {
  const { user, setUser } = useUserContext();
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: achievement,
    onSubmit: async (values, { setSubmitting }) => {
      if (achievement.isHotNew) {
        createAchievementFinalizeHandler({
          employeeID: user["profile"].employeeID,
          index,
          values,
          setSubmitting,
          setIsCreatingAchievement,
          setUser,
          setIsEditing,
          achievementCategory,
        });
      } else {
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
      }
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
        {ACHIEVEMENTS_SCHEMA_MAP.get(achievementCategory).fields.map(
          (field) => (
            <Grid item xs={12} md={6} key={field.db_field}>
              <Box px={0.5} py={0.5}>
                <EditNode
                  field={field}
                  formik={formik}
                  setIsUploading={setIsUploading}
                ></EditNode>
              </Box>
            </Grid>
          )
        )}
      </Grid>
    </form>
  );

  return (
    <AchievementCard
      achievement={achievement}
      achievementIndex={index}
      achievementCategory={achievementCategory}
      {...{ expanded, setExpanded }}
      cardActions={
        <Fragment>
          <IconButton
            aria-label="cancel"
            onClick={(e) => {
              e.stopPropagation();
              if (achievement.isHotNew) {
                setIsCreatingAchievement(false);
                setIsEditing(false);

                setUser((oldState) => {
                  let newState = { ...oldState };
                  if (newState[achievementCategory].length >= index) {
                    newState[achievementCategory].splice(index, 1);
                  }

                  return newState;
                });
                setIsEditing(false);
              } else {
                setIsEditing(false);
              }
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

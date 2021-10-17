import React, { Fragment } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

import { useUserContext } from "../../contexts/UserContext";
import AAchievement from "./AAchievement.jsx";
import CreateAchievement from "./CreateAchievement";

const useStyles = makeStyles((theme) => ({
  noPubMsg: {
    textAlign: "center",
  },
}));

const Achievements = ({
  achievementCategory,
  getAchievementValidationSchema,
}) => {
  const { user, setUser } = useUserContext();
  const classes = useStyles();

  return (
    <Fragment>
      {!!user ? (
        <Fragment>
          <Box pt={1}>
            {!!user[achievementCategory] &&
            user[achievementCategory].length !== 0 ? (
              user[achievementCategory].map((achievement, index) => (
                <AAchievement
                  key={index}
                  achievementCategory={achievementCategory}
                  getAchievementValidationSchema={
                    getAchievementValidationSchema
                  }
                  achievement={achievement}
                  index={index}
                />
              ))
            ) : (
              <Typography className={classes.noPubMsg}>
                {"No " + achievementCategory + " here, Create One!"}
              </Typography>
            )}
          </Box>
          <CreateAchievement achievementCategory={achievementCategory} />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default Achievements;

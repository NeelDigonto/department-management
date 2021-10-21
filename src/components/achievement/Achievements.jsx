import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";

import { useUserContext } from "../../contexts/UserContext";
import AAchievement from "./AAchievement.jsx";
import CreateAchievement from "./CreateAchievement";
import { ACHIEVEMENTS_GROUP_SCHEMA } from "../../data/schema";

const Achievements = ({
  achievementCategory,
  getAchievementValidationSchema,
}) => {
  const { user, setUser } = useUserContext();

  return (
    <Fragment>
      {!!user ? (
        <Fragment>
          {!!user[achievementCategory] &&
          user[achievementCategory].length !== 0 ? (
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-around"
              alignItems="flex-start"
            >
              {user[achievementCategory].map((achievement, index) => (
                <AAchievement
                  key={index}
                  achievementCategory={achievementCategory}
                  getAchievementValidationSchema={
                    getAchievementValidationSchema
                  }
                  achievement={achievement}
                  index={index}
                />
              ))}
            </Box>
          ) : (
            <Box pt={1}>
              <Typography align="center" fontSize="1.75rem" color="primary">
                {"No "}
                {ACHIEVEMENTS_GROUP_SCHEMA[achievementCategory].icon}
                {` ${ACHIEVEMENTS_GROUP_SCHEMA[achievementCategory].diplay_name} here, Create One!`}
              </Typography>
            </Box>
          )}

          <CreateAchievement achievementCategory={achievementCategory} />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default Achievements;

import React from "react";
import { Box, Typography } from "@mui/material";

import { useUserContext } from "../../contexts/UserContext";
import AAchievement from "./AAchievement";
import CreateAchievement from "./CreateAchievement";
import { ACHIEVEMENTS_SCHEMA_MAP } from "../../data/schema";

interface AchievementsProps {
  achievementCategory: string;
  getAchievementValidationSchema: any;
  isAdmin: boolean;
}

const Achievements = ({
  achievementCategory,
  getAchievementValidationSchema,
  isAdmin,
}: AchievementsProps) => {
  const { user, setUser } = useUserContext();
  const [isCreatingAchievement, setIsCreatingAchievement] =
    React.useState<boolean>(false);
  return (
    <React.Fragment>
      {!!user ? (
        <React.Fragment>
          {!!user[achievementCategory] &&
          user[achievementCategory].length !== 0 ? (
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-around"
              alignItems="flex-start"
            >
              {user[achievementCategory].map(
                (achievement: any, index: number) => (
                  <AAchievement
                    key={index}
                    {...{
                      isAdmin,
                      achievementCategory,
                      getAchievementValidationSchema,
                      setIsCreatingAchievement,
                      achievement,
                      index,
                    }}
                  />
                )
              )}
            </Box>
          ) : (
            <Box pt={1}>
              <Typography align="center" fontSize="1.75rem" color="primary">
                {"No "}
                {ACHIEVEMENTS_SCHEMA_MAP.get(achievementCategory).icon}
                {` ${
                  ACHIEVEMENTS_SCHEMA_MAP.get(achievementCategory).diplay_name
                } here, Create One!`}
              </Typography>
            </Box>
          )}
        </React.Fragment>
      ) : null}
      <CreateAchievement
        {...{
          isAdmin,
          achievementCategory,
          isCreatingAchievement,
          setIsCreatingAchievement,
        }}
      />
    </React.Fragment>
  );
};

export default Achievements;

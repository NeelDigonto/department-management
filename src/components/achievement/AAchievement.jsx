import React, { useState, Fragment, useEffect } from "react";
import { Card, Box, CardContent } from "@mui/material";

import DisplayAchievement from "./DisplayAchievement.jsx";
import EditAchievement from "./EditAchievement.jsx";
import AchievementCard from "./ui/AchievementCard";

const AAchievement = ({
  achievementCategory,
  getAchievementValidationSchema,
  achievement,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Fragment>
      <AchievementCard
        key={index}
        achievementCategory={achievementCategory}
        achievement={achievement}
        achievementIndex={index}
        setIsEditing={setIsEditing}
      />

      {/* <Box pt={2}>
      <Card variant="outlined">
        <CardContent>
          {!isEditing ? (
            <DisplayAchievement
              achievementCategory={achievementCategory}
              achievement={achievement}
              index={index}
              setIsEditing={setIsEditing}
            />
          ) : (
            <EditAchievement
              achievementCategory={achievementCategory}
              getAchievementValidationSchema={getAchievementValidationSchema}
              achievement={achievement}
              index={index}
              setIsEditing={setIsEditing}
            />
          )}
        </CardContent>
      </Card>
    </Box> */}
    </Fragment>
  );
};

export default AAchievement;

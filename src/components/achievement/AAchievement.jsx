import React, { useState, Fragment, useEffect } from "react";
import { Card, Box, CardContent } from "@mui/material";

import DisplayAchievement from "./DisplayAchievement.jsx";
import EditAchievement from "./EditAchievement.jsx";
import AchievementCard from "./AchievementCard";

const AAchievement = ({
  achievementCategory,
  getAchievementValidationSchema,
  achievement,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Fragment>
      {!isEditing ? (
        <DisplayAchievement
          achievementCategory={achievementCategory}
          achievement={achievement}
          index={index}
          setIsEditing={setIsEditing}
          {...{ expanded, setExpanded }}
        />
      ) : (
        <EditAchievement
          achievementCategory={achievementCategory}
          getAchievementValidationSchema={getAchievementValidationSchema}
          achievement={achievement}
          index={index}
          setIsEditing={setIsEditing}
          {...{ expanded, setExpanded }}
        />
      )}
    </Fragment>
  );
};

export default AAchievement;

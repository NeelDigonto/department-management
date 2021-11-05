import React, { useState, Fragment, useEffect } from "react";
import { Card, Box, CardContent } from "@mui/material";

import DisplayAchievement from "./DisplayAchievement.jsx";
import EditAchievement from "./EditAchievement.jsx";
import AchievementCard from "./AchievementCard";

const AAchievement = ({
  achievementCategory,
  getAchievementValidationSchema,
  setIsCreatingAchievement,
  achievement,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(() =>
    achievement.isHotNew ? true : false
  );
  const [expanded, setExpanded] = React.useState(() =>
    achievement.isHotNew ? true : false
  );

  return (
    <Fragment>
      {!isEditing ? (
        <DisplayAchievement
          {...{
            achievementCategory,
            achievement,
            index,
            setIsEditing,
            expanded,
            setExpanded,
          }}
        />
      ) : (
        <EditAchievement
          {...{
            achievementCategory,
            getAchievementValidationSchema,
            achievement,
            index,
            setIsEditing,
            setIsCreatingAchievement,
            expanded,
            setExpanded,
          }}
        />
      )}
    </Fragment>
  );
};

export default AAchievement;

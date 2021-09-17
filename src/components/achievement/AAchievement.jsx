import React, { useState, useEffect } from "react";
import { Card, Box, CardContent } from "@material-ui/core";

import DisplayAchievement from "./DisplayAchievement.jsx";
import EditAchievement from "./EditAchievement.jsx";

const AAchievement = ({
  achievementCategory,
  getAchievementValidationSchema,
  achievement,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Box pt={2}>
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
    </Box>
  );
};

export default AAchievement;

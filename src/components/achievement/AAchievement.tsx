import React from "react";

import DisplayAchievement from "./DisplayAchievement";
import EditAchievement from "./EditAchievement";

interface AAchievementProps {
  achievementCategory: string;
  getAchievementValidationSchema: any;
  setIsCreatingAchievement: React.Dispatch<React.SetStateAction<boolean>>;
  achievement: any;
  index: number;
  isAdmin: boolean;
}

const AAchievement = ({
  achievementCategory,
  getAchievementValidationSchema,
  setIsCreatingAchievement,
  achievement,
  index,
  isAdmin,
}: AAchievementProps) => {
  const [isEditing, setIsEditing] = React.useState(() =>
    achievement.isHotNew ? true : false
  );
  const [expanded, setExpanded] = React.useState(() =>
    achievement.isHotNew ? true : false
  );

  return (
    <React.Fragment>
      {!isEditing ? (
        <DisplayAchievement
          {...{
            isAdmin,
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
    </React.Fragment>
  );
};

export default AAchievement;

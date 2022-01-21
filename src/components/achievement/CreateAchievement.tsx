import React, { useState } from "react";
import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { hotCreateAchievementHandler } from "./handlers";
import { useUserContext } from "../../contexts/UserContext";

interface CreateAchievementProps {
  achievementCategory: string;
  isCreatingAchievement: boolean;
  setIsCreatingAchievement: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAchievement = ({
  achievementCategory,
  isCreatingAchievement,
  setIsCreatingAchievement,
}: CreateAchievementProps) => {
  const { user, setUser } = useUserContext();

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1 },
        position: "fixed",
        bottom: "2%",
        right: "4%",
      }}
    >
      <Fab
        color="primary"
        aria-label="add"
        disabled={isCreatingAchievement}
        onClick={() => {
          hotCreateAchievementHandler(
            user["profile"]["employeeID"],
            setUser,
            setIsCreatingAchievement,
            achievementCategory
          );
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default CreateAchievement;

import React, { useState } from "react";
import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { createAchievementHandler } from "./handlers";
import { useUserContext } from "../../contexts/UserContext";

const CreateAchievement = ({ achievementCategory }) => {
  const { user, setUser } = useUserContext();

  const [isCreatingAchievement, setIsCreatingAchievement] = useState(false);

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
          createAchievementHandler(
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

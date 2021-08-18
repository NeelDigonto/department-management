import React, { useState } from "react";
import { Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { createAchievementHandler } from "./handlers";
import { useUserContext } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: /* theme.spacing(2) */ "4%",
  },
}));

const CreateAchievement = ({ achievementCategory }) => {
  const classes = useStyles();
  const { user, setUser } = useUserContext();

  const [isCreatingAchievement, setIsCreatingAchievement] = useState(false);

  return (
    <Fab
      className={classes.fab}
      color="primary"
      aria-label="add"
      disabled={isCreatingAchievement}
      onClick={() => {
        createAchievementHandler(
          user.employeeID,
          setUser,
          setIsCreatingAchievement,
          achievementCategory
        );
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default CreateAchievement;

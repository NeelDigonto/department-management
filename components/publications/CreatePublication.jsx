import React, { useState } from "react";
import { Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { createPublicationHandler } from "./handlers";
import { useUserContext } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: /* theme.spacing(2) */ "4%",
  },
}));

const CreatePublication = ({}) => {
  const classes = useStyles();
  const { user, setUser } = useUserContext();

  const [isCreatingPublication, setIsCreatingPublication] = useState(false);

  return (
    <Fab
      className={classes.fab}
      color="primary"
      aria-label="add"
      disabled={isCreatingPublication}
      onClick={() => {
        createPublicationHandler(user.employeeID, setUser, setIsCreatingPublication);
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default CreatePublication;

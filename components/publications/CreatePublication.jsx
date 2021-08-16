import React, { useState } from "react";
import { Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { useUserContext } from "../../contexts/UserContext";
import { MASTER_SCHEMA } from "../../data/schema";

let emptyPublicationDataBP = {};
emptyPublicationDataBP["sl_no"] = 0;
MASTER_SCHEMA["publications"]["fields"].forEach((item) => {
  emptyPublicationDataBP[item.db_field] = item.value;
});

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

  const createPublicationHandler = async () => {
    setIsCreatingPublication(true);
    const emptyPublicationData = { ...emptyPublicationDataBP, sl_no: user["publications"].length };
    fetch("/api/user/editData/publications/create_new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeID: user.employeeID,
        emptyPublicationData: emptyPublicationData,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.created === true) {
          setUser((oldState) => {
            let newState = { ...oldState };
            newState["publications"].push(emptyPublicationData);
            setIsCreatingPublication(false);
            return newState;
          });
        } else {
          console.log("Couldn't create publication");
          setIsCreatingPublication(false);
        }
      });
  };

  return (
    <Fab
      className={classes.fab}
      color="primary"
      aria-label="add"
      disabled={isCreatingPublication}
      onClick={createPublicationHandler}
    >
      <AddIcon />
    </Fab>
  );
};

export default CreatePublication;

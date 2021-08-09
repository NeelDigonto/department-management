import React, { useState, useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { schema } from "../../data/schema";
import { Card, Box, CardContent, Grid, Typography, Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

let emptyPublicationDataBP = {};
emptyPublicationDataBP["sl_no"] = 0;
schema["Publications"]["fields"].forEach((item) => {
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
    const emptyPublicationData = { ...emptyPublicationDataBP, sl_no: user["Publications"].length };
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
            newState["Publications"].push(emptyPublicationData);
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

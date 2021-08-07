import React, { Fragment, useState } from "react";
import DisplayPublication from "./DisplayPublication.jsx";
import { useUserContext } from "../../contexts/UserContext";
import APublication from "./APublication.jsx";
import { Card, Box, CardContent, Grid, Typography, Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: /* theme.spacing(2) */ "4%",
  },
}));

const Publications = () => {
  const { user, setUser } = useUserContext();
  const classes = useStyles();

  return (
    <Fragment>
      <Box pt={4}>
        {!!user
          ? user["Publications"].map((publication, index) => (
              <APublication key={index} publication={publication} index={index} />
            ))
          : null}
      </Box>
      <Fab className={classes.fab} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Fragment>
  );
};

export default Publications;

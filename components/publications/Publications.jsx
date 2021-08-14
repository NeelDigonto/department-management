import React, { Fragment, useState } from "react";
import DisplayPublication from "./DisplayPublication.jsx";
import { useUserContext } from "../../contexts/UserContext";
import APublication from "./APublication.jsx";
import { Card, Box, CardContent, Grid, Typography, Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CreatePublication from "./CreatePublication.jsx";

const useStyles = makeStyles((theme) => ({
  noPubMsg: {
    textAlign: "center",
  },
}));

const Publications = () => {
  const { user, setUser } = useUserContext();
  const classes = useStyles();

  return (
    <Fragment>
      <Box pt={4}>
        {!!user ? (
          user["publications"].length === 0 ? (
            <Typography className={classes.noPubMsg}>
              {"No Publications here, Create One!"}
            </Typography>
          ) : (
            user["publications"].map((publication, index) => (
              <APublication key={index} publication={publication} index={index} />
            ))
          )
        ) : null}
      </Box>
      <CreatePublication />
    </Fragment>
  );
};

export default Publications;

import React, { Fragment } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

import { useUserContext } from "../../contexts/UserContext";
import APublication from "./APublication.jsx";
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
      {!!user ? (
        <Fragment>
          <Box pt={4}>
            {user["publications"].length === 0 ? (
              <Typography className={classes.noPubMsg}>
                {"No Publications here, Create One!"}
              </Typography>
            ) : (
              user["publications"].map((publication, index) => (
                <APublication key={index} publication={publication} index={index} />
              ))
            )}
          </Box>
          <CreatePublication />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default Publications;

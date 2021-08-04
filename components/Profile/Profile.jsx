import { Fragment, useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

import { schema } from "../../data/schema";
import { useUserContext } from "../../contexts/UserContext";

const useStyles = makeStyles({
  label: {
    fontSize: 16,
  },
  value: {},
});

const Profile = () => {
  const { user, setUser } = useUserContext();
  const classes = useStyles();

  return (
    <Fragment>
      {!!user
        ? schema["Profile"].map((item) => (
            <Grid key={item.db_field} item>
              <Card variant="outlined">
                <CardContent>
                  <Typography className={classes.label} color="textSecondary" gutterBottom>
                    {item.label}
                  </Typography>
                  {user["Profile"][item.db_field]}
                </CardContent>
              </Card>
            </Grid>
          ))
        : null}
    </Fragment>
  );
};

export default Profile;

import React, { Fragment } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { MASTER_SCHEMA } from "../../data/schema";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { Card, Box, CardContent, Grid, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 16,
    color: "#2e2ec7",
  },
  value: { fontSize: "18" },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: /* theme.spacing(2) */ "4%",
  },
}));

const DisplayProfile = ({ setIsEditing }) => {
  const { user, setUser } = useUserContext();
  const classes = useStyles();

  return (
    <Fragment>
      <Box pt={4}>
        {MASTER_SCHEMA["profile"].map((item) => (
          <Box key={item.db_field}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {item.label}
                </Typography>
                {user["profile"][item.db_field]}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="Edit"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        <EditIcon />
      </Fab>
    </Fragment>
  );
};

export default DisplayProfile;

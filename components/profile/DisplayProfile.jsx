import React from "react";
import { useUserContext } from "../../contexts/UserContext";
import { schema } from "../../data/schema";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import { Card, Box, CardContent, Grid, Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  label: {
    fontSize: 16,
    color: "#2e2ec7",
  },
  value: { fontSize: "18" },
});

const DisplayProfile = () => {
  const { user, setUser } = useUserContext();
  const classes = useStyles();

  return (
    <Box pt={4}>
      {schema["Profile"].map((item) => (
        <Card key={item.db_field} variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {item.label}
            </Typography>
            {user["Profile"][item.db_field]}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DisplayProfile;

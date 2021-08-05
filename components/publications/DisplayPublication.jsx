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
import APublication from "./APublication";

import EditIcon from "@material-ui/icons/Edit";

const DisplayPublication = () => {
  const { user, setUser } = useUserContext();
  return (
    <Box pt={4}>
      {user["Publications"].map((publication) => (
        <APublication key={uuidv4()} publication={publication} />
      ))}
    </Box>
  );
};

export default DisplayPublication;

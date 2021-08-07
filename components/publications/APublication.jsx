import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { schema } from "../../data/schema";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import { Card, Box, CardContent, Grid, Typography, Button } from "@material-ui/core";

import DisplayPublication from "./DisplayPublication.jsx";
import EditPublication from "./EditPublication.jsx";

import EditIcon from "@material-ui/icons/Edit";

const APublication = ({ publication, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Card variant="outlined">
      <CardContent>
        <Box pt={4}>
          {!isEditing ? (
            <DisplayPublication publication={publication} index={index} />
          ) : (
            <EditPublication publication={publication} index={index} setIsEditing={setIsEditing} />
          )}
          {!isEditing ? (
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => {
                setIsEditing((oldState) => !oldState);
              }}
            >
              {"Edit"}
            </Button>
          ) : null}
        </Box>
      </CardContent>
    </Card>
  );
};

export default APublication;

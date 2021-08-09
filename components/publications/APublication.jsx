import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { schema } from "../../data/schema";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import { Card, Box, CardContent, Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

import DisplayPublication from "./DisplayPublication.jsx";
import EditPublication from "./EditPublication.jsx";

import EditIcon from "@material-ui/icons/Edit";

const APublication = ({ publication, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useUserContext();

  const deletePublicationHandler = (sl_no_to_delete) => {
    fetch("api/user/editData/publications/delete", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeID: user.employeeID, delete_sl_no: sl_no_to_delete }),
    })
      .then((respone) => respone.json())
      .then((result) => {
        if (result.deleted) {
          setUser((oldState) => {
            let newState = { ...oldState };
            newState["Publications"] = newState["Publications"].filter(
              (item) => item.sl_no !== sl_no_to_delete
            );
            return newState;
          });
        } else {
          console.error("pub not deleted");
          console.log(result.updateResult);
        }
      });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Box pt={2}>
          {!isEditing ? (
            <DisplayPublication publication={publication} index={index} />
          ) : (
            <EditPublication publication={publication} index={index} setIsEditing={setIsEditing} />
          )}
          {!isEditing ? (
            <Box pt={2}>
              <ButtonGroup fullWidth aria-label="edit button group">
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
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => {
                    deletePublicationHandler(publication.sl_no);
                  }}
                >
                  {"Delete"}
                </Button>
              </ButtonGroup>
            </Box>
          ) : null}
        </Box>
      </CardContent>
    </Card>
  );
};

export default APublication;

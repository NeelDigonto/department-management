import React, { Fragment } from "react";
import { Grid, Box, ButtonGroup, Button } from "@material-ui/core";

import { useUserContext } from "../../contexts/UserContext";
import DisplayNode from "../nodes/DisplayNode";
import { MASTER_SCHEMA } from "../../data/schema";
import { WIDTH_TYPE } from "../../data/types/types";
import { deletePublicationHandler } from "./handlers";

const DisplayPublication = ({ publication, index, setIsEditing }) => {
  const { user, setUser } = useUserContext();

  const info_content = () => (
    <Fragment>
      {MASTER_SCHEMA["publications"]["fields"].map((field, index) => {
        const value = publication[field.db_field];
        let media_queries = {};
        if (!field.view_width) {
          media_queries = { xs: 12, lg: 6 };
        } else if (field.view_width === WIDTH_TYPE.SMALL) {
          media_queries = { xs: 6, lg: 6 };
        } else if (field.view_width === WIDTH_TYPE.MEDIUM) {
          media_queries = { xs: 6, lg: 6 };
        } else if (field.view_width === WIDTH_TYPE.LARGE) {
          media_queries = { xs: 6, lg: 6 };
        }

        return (
          <Grid item {...media_queries} key={field.db_field}>
            <DisplayNode field={field} value={value}></DisplayNode>
          </Grid>
        );
      })}
    </Fragment>
  );

  return (
    <Fragment>
      <Grid container>{info_content()}</Grid>
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
              deletePublicationHandler(user.employeeID, publication.id, setUser);
            }}
          >
            {"Delete"}
          </Button>
        </ButtonGroup>
      </Box>
    </Fragment>
  );
};

export default DisplayPublication;

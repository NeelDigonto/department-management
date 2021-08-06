import React, { Fragment, useState } from "react";
import DisplayPublication from "./DisplayPublication";
import { useUserContext } from "../../contexts/UserContext";
import APublication from "./APublication";
import { Card, Box, CardContent, Grid, Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

const Publications = () => {
  const { user, setUser } = useUserContext();

  return (
    <Box pt={4}>
      {!!user
        ? user["Publications"].map((publication, index) => (
            <APublication key={uuidv4()} publication={publication} index={index} />
          ))
        : null}
    </Box>
  );
};

export default Publications;

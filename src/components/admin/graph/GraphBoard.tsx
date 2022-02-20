import React from "react";
import { Paper, Box } from "@mui/material";

import AGraph from "./AGraph";
import AGraph2 from "./AGraph2";

export default function Graph() {
  return (
    <React.Fragment>
      <AGraph />
      <AGraph2 />
    </React.Fragment>
  );
}

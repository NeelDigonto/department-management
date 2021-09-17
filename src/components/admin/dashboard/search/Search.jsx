import React, { Fragment, useRef, useEffect } from "react";
import { Box, makeStyles, Grid, Paper, Card, CardContent, Container } from "@material-ui/core";

import ProfileFilter from "./panels/ProfileFilter";
import AchievementFilter from "./panels/AchievementFilter";

const useStyles = makeStyles((theme) => ({ searchBox: { maxHeight: "10rem" } }));

const Search = ({
  valueLastUpdatedRef,
  toFilterRef,
  filterRef,

  sortRef,
  displayRef,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <ProfileFilter
        {...{
          valueLastUpdatedRef,
          toFilterRef,
          filterRef,

          sortRef,
          displayRef,
        }}
      />
      <AchievementFilter
        {...{
          valueLastUpdatedRef,
          toFilterRef,
          filterRef,

          sortRef,
          displayRef,
        }}
      />
    </Fragment>
  );
};

export default Search;

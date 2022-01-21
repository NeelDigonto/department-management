import React, { Fragment } from "react";
import { Box, Paper } from "@mui/material";

import ProfileFilter from "./panels/ProfileFilter";
import AchievementFilter from "./panels/AchievementFilter";

const Search = ({
  valueLastUpdatedRef,
  toFilterRef,
  filterRef,
  sortRef,
  displayRef,
}) => {
  return (
    <Fragment>
      <Box maxHeight="60rem" borderRadius={2} overflow="auto">
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
      </Box>
    </Fragment>
  );
};

export default React.memo(Search);

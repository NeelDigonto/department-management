import React, { Fragment } from "react";
import { Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ProfileFilter from "./panels/ProfileFilter";
import AchievementFilter from "./panels/AchievementFilter";

const Search = ({
  valueLastUpdatedRef,
  toFilterRef,
  filterRef,
  sortRef,
  displayRef,
}) => {
  const theme = useTheme();
  return (
    <Fragment>
      <Box maxHeight="40rem" borderRadius={2} overflow="auto">
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

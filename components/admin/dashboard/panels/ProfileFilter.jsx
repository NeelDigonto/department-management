import React, { Fragment } from "react";
import { Box, Grid, Paper, Card, CardContent } from "@material-ui/core";

import FilterNode from "../../../nodes/FilterNode";
import { MASTER_SCHEMA, ACHIEVEMENTS_GROUP_SCHEMA } from "../../../../data/schema";

const ProfileFilter = ({ valueLastUpdatedRef, filterRef, sortRef, displayRef }) => {
  return (
    <Fragment>
      {MASTER_SCHEMA["profile"].map((field, index) => (
        <Grid key={index} item md={3}>
          <Box px={1} py={1}>
            <FilterNode
              valueLastUpdatedRef={valueLastUpdatedRef}
              categoryName="profile"
              filterRef={filterRef}
              sortRef={sortRef}
              displayRef={displayRef}
              field={field}
            />
          </Box>
        </Grid>
      ))}
    </Fragment>
  );
};

export default ProfileFilter;

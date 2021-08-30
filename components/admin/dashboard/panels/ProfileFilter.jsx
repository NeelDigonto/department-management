import React, { Fragment } from "react";
import {
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FilterNode from "../../../nodes/FilterNode";
import { MASTER_SCHEMA, ACHIEVEMENTS_GROUP_SCHEMA } from "../../../../data/schema";

const ProfileFilter = ({ valueLastUpdatedRef, toFilterRef, filterRef, sortRef, displayRef }) => {
  return (
    <Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label={
              <Typography variant="subtitle1" color="secondary">
                {"Profile"}
              </Typography>
            }
          />
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Grid container>
              {MASTER_SCHEMA["profile"].map((field, index) => (
                <Grid key={index} item md={3}>
                  <Box px={1} py={1}>
                    <FilterNode
                      toFilterRef={toFilterRef}
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
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
};

export default ProfileFilter;

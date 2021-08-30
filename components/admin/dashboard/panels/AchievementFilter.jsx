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

const AchievementFilter = ({
  valueLastUpdatedRef,
  toFilterRef,
  filterRef,
  sortRef,
  displayRef,
}) => {
  return (
    <Fragment>
      {Object.keys(ACHIEVEMENTS_GROUP_SCHEMA).map((key, key_index) => {
        const categoryName = key;

        return (
          <Fragment key={key_index}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id={`accordion-action-${ACHIEVEMENTS_GROUP_SCHEMA[key].diplay_name}`}
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox />}
                  label={
                    <Typography variant="subtitle1" color="secondary">
                      {ACHIEVEMENTS_GROUP_SCHEMA[key].diplay_name}
                    </Typography>
                  }
                />
              </AccordionSummary>
              <AccordionDetails>
                <Box key={key_index} pt={2}>
                  <Box>
                    <Grid container>
                      {ACHIEVEMENTS_GROUP_SCHEMA[key]["fields"].map((field, field_index) => (
                        <Grid key={field_index} item md={3}>
                          <Box px={1} py={1}>
                            <FilterNode
                              valueLastUpdatedRef={valueLastUpdatedRef}
                              categoryName={key}
                              toFilterRef={toFilterRef}
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
                </Box>
              </AccordionDetails>
            </Accordion>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default AchievementFilter;

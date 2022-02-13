import React, { Fragment } from "react";
import {
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import FilterNode from "@components/nodes/SearchNode";
import { ACHIEVEMENTS_SCHEMA_MAP } from "@data/schema";

const AchievementFilter = ({
  valueLastUpdatedRef,
  toFilterRef,
  filterRef,

  sortRef,
  displayRef,
}) => {
  return (
    <Fragment>
      {Array.from(ACHIEVEMENTS_SCHEMA_MAP.entries()).map(
        ([key, achievementSchema], key_index) => {
          return (
            <Fragment key={key_index}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-label="Expand"
                  aria-controls="additional-actions1-content"
                  id={`accordion-action-${achievementSchema.diplay_name}`}
                >
                  <FormControlLabel
                    aria-label="Acknowledge"
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={<Checkbox />}
                    label={
                      <Typography variant="subtitle1" color="secondary">
                        {achievementSchema.diplay_name}
                      </Typography>
                    }
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Box pt={2}>
                    <Box>
                      <Grid container>
                        {achievementSchema.fields.map((field, field_index) => (
                          <Grid key={field_index} item md={3}>
                            <Box px={1} py={1}>
                              <FilterNode
                                {...{
                                  valueLastUpdatedRef,
                                  categoryName: key,
                                  toFilterRef,
                                  filterRef,

                                  sortRef,
                                  displayRef,
                                  field,
                                }}
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
        }
      )}
    </Fragment>
  );
};

export default React.memo(AchievementFilter);

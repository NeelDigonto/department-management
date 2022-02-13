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
import { MASTER_SCHEMA } from "@data/schema";

const ProfileFilter = ({
  valueLastUpdatedRef,
  toFilterRef,
  filterRef,
  sortRef,
  displayRef,
}) => {
  return (
    <Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id={`accordion-action-profile}`}
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
              {MASTER_SCHEMA.profile.map((field, index) => (
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

export default React.memo(ProfileFilter);

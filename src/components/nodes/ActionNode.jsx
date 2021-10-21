import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import PrintIcon from "@mui/icons-material/Print";

import { INPUT_TYPE } from "../../data/types/types";

const ActionNode = ({
  field,
  categoryName,
  filter,
  sort,
  display,
  toFilterRef,
  setFilter,
  setSort,
  setDisplay,
  filterRef,
  sortRef,
  displayRef,
  valueLastUpdatedRef,
}) => {
  const [formats, setFormats] = React.useState(() => [
    /*     "filter",
    "sort",
    "display", */
  ]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
    valueLastUpdatedRef.current = new Date();

    // filter update
    if (newFormats.includes("filter")) {
      setFilter(true);
      if (field.input_type !== INPUT_TYPE.FILE)
        toFilterRef.current[`${categoryName}.${field.db_field}`] = true;
      else
        toFilterRef.current[`${categoryName}.${field.db_field}.fname`] = true;
    } else {
      setFilter(false);
      if (field.input_type !== INPUT_TYPE.FILE)
        delete toFilterRef.current[`${categoryName}.${field.db_field}`];
      else
        delete toFilterRef.current[`${categoryName}.${field.db_field}.fname`];
    }

    // sort update
    if (newFormats.includes("sort")) {
      setSort(true);
    } else {
      setSort(false);
    }

    // display update
    if (newFormats.includes("display")) {
      setDisplay(true);
      displayRef.current[`${categoryName}.${field.db_field}`] = 1;
    } else {
      setDisplay(false);
      delete displayRef.current[`${categoryName}.${field.db_field}`];
    }
  };

  return (
    <Box pt={2}>
      <ToggleButtonGroup
        size="small"
        value={formats}
        onChange={handleFormat}
        aria-label="search parameters"
      >
        <ToggleButton value="filter" aria-label="filter">
          <FilterListIcon />
        </ToggleButton>
        <ToggleButton value="sort" aria-label="sort">
          <SortIcon />
        </ToggleButton>
        <ToggleButton value="display" aria-label="display">
          <PrintIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ActionNode;

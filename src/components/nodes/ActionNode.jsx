import React from "react";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SortIcon from "@mui/icons-material/Sort";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import AddToQueueOutlinedIcon from "@mui/icons-material/AddToQueueOutlined";

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
  const handleFilterToggle = () => {
    valueLastUpdatedRef.current = new Date();
    setFilter((oldState) => {
      if (oldState) {
        if (field.input_type !== INPUT_TYPE.FILE)
          delete toFilterRef.current[`${categoryName}.${field.db_field}`];
        else
          delete toFilterRef.current[`${categoryName}.${field.db_field}.fname`];
      } else {
        if (field.input_type !== INPUT_TYPE.FILE)
          toFilterRef.current[`${categoryName}.${field.db_field}`] = true;
        else
          toFilterRef.current[`${categoryName}.${field.db_field}.fname`] = true;
      }

      return !oldState;
    });
  };

  const handleSortToggle = () => {
    valueLastUpdatedRef.current = new Date();
    setSort((oldState) => {
      //if (oldState) delete sortRef.current[`${categoryName}.${field.db_field}`];
      return !oldState;
    });
  };

  const handleDisplayToggle = () => {
    valueLastUpdatedRef.current = new Date();
    setDisplay((oldState) => {
      if (oldState)
        delete displayRef.current[`${categoryName}.${field.db_field}`];
      else displayRef.current[`${categoryName}.${field.db_field}`] = 1;
      return !oldState;
    });
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            icon={<FilterListOutlinedIcon />}
            checkedIcon={<FilterListIcon />}
            color="primary"
            checked={filter}
            onChange={handleFilterToggle}
            name={field.db_field}
          />
        }
        label=""
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<SortOutlinedIcon />}
            checkedIcon={<SortIcon />}
            color="primary"
            checked={sort}
            onChange={handleSortToggle}
            name={field.db_field}
          />
        }
        label=""
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={display}
            icon={<AddToQueueOutlinedIcon />}
            checkedIcon={<AddToQueueIcon />}
            color="primary"
            onChange={handleDisplayToggle}
            name={field.db_field}
          />
        }
        label=""
      />
    </Box>
  );
};

export default ActionNode;

/*<FormControlLabel
        control={
          <Checkbox
            checked={display}
            onChange={handleDisplayToggle}
            name={field.db_field}
            color="primary"
          />
        }
        //label={"Display"}
        label={<AddToQueueIcon />}
      ></FormControlLabel>*/

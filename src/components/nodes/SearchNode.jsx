import React, { Fragment, useState } from "react";
import { Typography } from "@mui/material";

import ActionNode from "./ActionNode";
import TextQuerry from "./querry/TextQuerry";
import EmailQuerry from "./querry/EmailQuerry";
import SelectQuerry from "./querry/SelectQuerry";
import DateQuerry from "./querry/DateQuerry";
import NumberQuerry from "./querry/NumberQuerry";
import CheckboxQuerry from "./querry/CheckboxQuerry";
import FileQuerry from "./querry/FileQuerry";

import { VALUE_TYPE, INPUT_TYPE, DB_FIELD_TYPE } from "@data/types/types";

const FilterNode = ({
  field,
  valueLastUpdatedRef,
  categoryName,
  toFilterRef,
  filterRef,
  sortRef,
  displayRef,
}) => {
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const [display, setDisplay] = useState(false);

  let filterNode = null;
  let sortNode = null;

  switch (field.input_type) {
    case INPUT_TYPE.TEXT: {
      filterNode = filter ? (
        <TextQuerry
          {...{ field, categoryName, valueLastUpdatedRef, filterRef }}
        />
      ) : null;
      break;
    }
    case INPUT_TYPE.EMAIL: {
      filterNode = filter ? (
        <EmailQuerry
          {...{ field, categoryName, valueLastUpdatedRef, filterRef }}
        />
      ) : null;
      break;
    }
    case INPUT_TYPE.SELECT: {
      filterNode = filter ? (
        <SelectQuerry
          {...{ field, categoryName, valueLastUpdatedRef, filterRef }}
        />
      ) : null;
      break;
    }
    case INPUT_TYPE.CUSTOM_SELECT: {
      filterNode = filter ? (
        <TextQuerry
          {...{ field, categoryName, valueLastUpdatedRef, filterRef }}
        />
      ) : null;
      break;
    }
    case INPUT_TYPE.DATE: {
      filterNode = filter ? (
        <DateQuerry
          {...{ field, categoryName, valueLastUpdatedRef, filterRef }}
        />
      ) : null;
      break;
    }
    case INPUT_TYPE.NUMBER: {
      filterNode = filter ? (
        <NumberQuerry
          {...{ field, categoryName, valueLastUpdatedRef, filterRef }}
        />
      ) : null;
      break;
    }
    case INPUT_TYPE.CHECKBOX: {
      filterNode = filter ? (
        <CheckboxQuerry
          {...{ field, categoryName, valueLastUpdatedRef, filterRef }}
        />
      ) : null;
      break;
    }
    case INPUT_TYPE.FILE: {
      filterNode = filter ? (
        <FileQuerry
          {...{ field, categoryName, valueLastUpdatedRef, filterRef }}
        />
      ) : null;
      break;
    }
  }

  const outputNode = (
    <Fragment>
      <Typography color="textSecondary" gutterBottom>
        {field.label}
      </Typography>
      <ActionNode
        {...{
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
        }}
      />
      {filterNode}
      {sortNode}
    </Fragment>
  );

  return outputNode;
};

export default FilterNode;

import React, { Fragment } from "react";

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
    </Fragment>
  );
};

export default React.memo(Search);

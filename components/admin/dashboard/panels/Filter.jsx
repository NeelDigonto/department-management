import React, { Fragment, useRef, useEffect } from "react";
import { Box, Grid, Paper, Card, CardContent } from "@material-ui/core";

import ProfileFilter from "./ProfileFilter";
import AchievementFilter from "./AchievementFilter";

const Filter = () => {
  const toFilterRef = useRef({});
  const filterRef = useRef({});
  const sortRef = useRef({});
  const displayRef = useRef({});

  const valueLastUpdatedRef = useRef(new Date());
  const resultLastUpdatedRef = useRef(new Date());

  const _MS = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      if (valueLastUpdatedRef.current.getTime() - resultLastUpdatedRef.current.getTime() >= _MS) {
        resultLastUpdatedRef.current = valueLastUpdatedRef.current;

        let filter = {};
        Object.keys(toFilterRef.current).forEach((field_key, item) => {
          const split_field_key = field_key.split(".");
          const first_split_ind = field_key.indexOf(".");

          if (!!split_field_key[0] && toFilterRef.current[field_key] === true) {
            if (split_field_key[0] === "profile") {
              filter[field_key] = filterRef.current[field_key];
            } else {
              //for achievements
              if (!filter[split_field_key[0]]) filter[split_field_key[0]] = {};

              if (!filter[split_field_key[0]]["$elemMatch"])
                filter[split_field_key[0]]["$elemMatch"] = {};

              /*  filter[split_field_key[0]]["$elemMatch"][split_field_key[1]] =
                filterRef.current[field_key]; */

              filter[split_field_key[0]]["$elemMatch"][field_key.substring(first_split_ind + 1)] =
                filterRef.current[field_key];
            }
          }
        });

        console.log("toFilterRef: ", toFilterRef.current);
        console.log("filterRef: ", filterRef.current);
        console.log("filter: ", filter);
        /*         console.log("sortRef: ", sortRef.current);
        console.log("displayRef: ", displayRef.current); */

        fetch("/api/admin/search", {
          method: "POST",
          body: JSON.stringify({
            filter: filter,
            sort: sortRef.current,
            display: displayRef.current,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) => console.log("from server:", result));
        console.log("---------------------------------------------");
      }
    }, _MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <ProfileFilter {...{ valueLastUpdatedRef, toFilterRef, filterRef, sortRef, displayRef }} />
      <AchievementFilter
        {...{ valueLastUpdatedRef, toFilterRef, filterRef, sortRef, displayRef }}
      />
    </Fragment>
  );
};

export default Filter;

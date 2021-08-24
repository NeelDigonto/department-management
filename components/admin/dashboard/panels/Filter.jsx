import React, { Fragment, useRef, useEffect } from "react";
import { Box, Grid, Paper, Card, CardContent } from "@material-ui/core";

import ProfileFilter from "./ProfileFilter";

const Filter = () => {
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

        console.log("filterRef: ", filterRef.current);
        console.log("sortRef: ", sortRef.current);
        console.log("displayRef: ", displayRef.current);
        console.log("---------------------------------------------");

        /* fetch("/api/admin/search", {
          method: "POST",
          body: JSON.stringify({
            filter: filterRef.current,
            sort: sortRef.current,
            display: displayRef.current,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) => console.log(result)); */
      }
    }, _MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card variant="outlined">
      <CardContent>
        <Box>
          <Grid container>
            <ProfileFilter
              valueLastUpdatedRef={valueLastUpdatedRef}
              filterRef={filterRef}
              sortRef={sortRef}
              displayRef={displayRef}
            />
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Filter;

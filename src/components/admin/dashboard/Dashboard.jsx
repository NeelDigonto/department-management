import React, { Fragment, useState, useEffect, useRef } from "react";
import { Hidden, Grid, Box, Fab } from "@mui/material";
import ListIcon from "@mui/icons-material/List";

import Search from "./search/Search";
import DataTable from "./table/DataTable";
import DownloadOptions from "./download/DownloadOptions";
import RemoveStaleFiles from "./RemoveStaleFiles";

const _MS = 500;

const Dashboard = () => {
  const toFilterRef = useRef({});
  const filterRef = useRef({});
  const sortRef = useRef({});
  const displayRef = useRef({});

  const valueLastUpdatedRef = useRef(new Date(new Date().getTime() + _MS + 1));
  const resultLastUpdatedRef = useRef(new Date());

  const [rows, setRows] = useState([]);

  const getFilterObject = () => {
    const filter = {};

    Object.keys(toFilterRef.current).forEach((field_key, item) => {
      const split_field_key = field_key.split(".");
      const first_split_ind = field_key.indexOf(".");

      if (!!split_field_key[0] && toFilterRef.current[field_key] === true) {
        if (split_field_key[0] === "profile") {
          // for profile
          filter[field_key] = filterRef.current[field_key];
        } else {
          //stronger check if [0] is an achievement
          //for achievements

          if (
            !filter[split_field_key[0]] ||
            !filter[split_field_key[0]]["$elemMatch"]
          ) {
            filter[split_field_key[0]] = { $elemMatch: {} };
          }

          filter[split_field_key[0]]["$elemMatch"][
            field_key.substring(first_split_ind + 1)
          ] = filterRef.current[field_key];
        }
      }
    });
    return filter;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        valueLastUpdatedRef.current.getTime() -
          resultLastUpdatedRef.current.getTime() >=
        _MS
      ) {
        resultLastUpdatedRef.current = valueLastUpdatedRef.current;

        const filter = getFilterObject();

        console.log("toFilterRef: ", toFilterRef.current);
        console.log("filterRef: ", filterRef.current);
        console.log("filter: ", filter);
        console.log("sortRef: ", sortRef.current);
        console.log("displayRef: ", displayRef.current);

        fetch("/api/admin/search", {
          method: "POST",
          body: JSON.stringify({
            filter: filter,
            //sort: sortRef.current,
            display: displayRef.current,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) =>
            setRows(
              result.searchResult.map((document, index) => {
                return {
                  sl_no: index + 1,
                  name: document["profile"]["name"],
                  department: document["profile"]["department"],
                  designation: document["profile"]["designation"],
                  employeeID: document["profile"]["employeeID"],
                };
              })
            )
          );
        //.then((result) => console.log("from server:", result));
      }
    }, _MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <Grid
        container
        /* sx={{
          paddingTop: (theme) => theme.spacing(2),
          paddingBottom: (theme) => theme.spacing(4),
          paddingLeft: (theme) => theme.spacing(2),
          paddingRight: (theme) => theme.spacing(1),
        }} */
      >
        <Grid item xs={12} sm={12} lg={6}>
          <Box sx={{ marginRight: (theme) => theme.spacing(0.5) }}>
            <DataTable rows={rows} />
          </Box>
          <DownloadOptions {...{ getFilterObject, sortRef, displayRef }} />
          <RemoveStaleFiles />
        </Grid>
        <Hidden only={["xs", "sm"]}>
          <Grid
            item
            xs={false}
            sm={false}
            lg={6}
            elevation={6}
            /*    sx={{ overflow: "auto", maxHeight: "50rem" }} */
          >
            <Box sx={{ marginLeft: (theme) => theme.spacing(0.5) }}>
              <Search
                {...{
                  valueLastUpdatedRef,
                  toFilterRef,
                  filterRef,
                  sortRef,
                  displayRef,
                }}
              />
            </Box>
          </Grid>
        </Hidden>
      </Grid>
      <Hidden only={["md", "lg", "xl"]}>
        {/* for mobile */}
        <Fab
          color="primary"
          aria-label="add"
          /* sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(2),
            // theme.spacing(2)
            right: "4%",
          }} */
          onClick={() => {}}
        >
          <ListIcon />
        </Fab>
      </Hidden>
    </Fragment>
  );
};

export default Dashboard;

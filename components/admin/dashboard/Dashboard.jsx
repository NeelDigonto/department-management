import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Hidden,
  Grid,
  makeStyles,
  Box,
  Card,
  CardContent,
  Container,
  Button,
} from "@material-ui/core";

import Search from "./panels/Search";
import DataTable from "./table/DataTable";

const _MS = 500;

const useStyles = makeStyles((theme) => ({
  dashboardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  table: {
    paddingRight: theme.spacing(0.5),
  },
  searchBox: {
    paddingLeft: theme.spacing(0.5),
  },
  slidingItems: { height: "100%" },
  downloadButton: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

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

          if (!filter[split_field_key[0]] || !filter[split_field_key[0]]["$elemMatch"]) {
            filter[split_field_key[0]] = { $elemMatch: {} };
          }

          filter[split_field_key[0]]["$elemMatch"][field_key.substring(first_split_ind + 1)] =
            filterRef.current[field_key];
        }
      }
    });
    return filter;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (valueLastUpdatedRef.current.getTime() - resultLastUpdatedRef.current.getTime() >= _MS) {
        resultLastUpdatedRef.current = valueLastUpdatedRef.current;

        const filter = getFilterObject();

        console.log("toFilterRef: ", toFilterRef.current);
        console.log("filterRef: ", filterRef.current);
        console.log("filter: ", filter);
        //console.log("sortRef: ", sortRef.current);
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
                  employeeID: document["employeeID"],
                };
              })
            )
          );
        //.then((result) => console.log("from server:", result));
      }
    }, _MS);

    return () => clearInterval(interval);
  }, []);
  const handleWorkbookDownload = () => {
    fetch("/api/admin/download_selected", {
      method: "POST",
      body: JSON.stringify({
        filter: getFilterObject(),
        sort: sortRef.current,
        display: displayRef.current,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        window.open(url, "_blank");
        URL.revokeObjectURL(url);
      });
  };

  return (
    <Fragment>
      <Grid container className={classes.dashboardGrid}>
        <Grid item xs={12} sm={12} lg={6}>
          <Box className={classes.table}>
            <DataTable rows={rows} />
          </Box>
          <Box px={1} py={2}>
            <Card variant="outlined">
              <CardContent>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  className={classes.downloadButton}
                  onClick={() => {
                    window.open("/api/admin/download_all", "_blank");
                  }}
                >
                  Download All Data
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  className={classes.downloadButton}
                  onClick={handleWorkbookDownload}
                >
                  Download as multi-spreadsheets
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  className={classes.downloadButton}
                  onClick={handleWorkbookDownload}
                >
                  Download as single-spreadsheet
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Hidden only={["xs", "sm"]}>
          <Grid item xs={false} sm={false} lg={6} elevation={6}>
            <Box className={classes.searchBox}>
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
    </Fragment>
  );
};

export default Dashboard;

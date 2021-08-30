import React, { Fragment } from "react";
import { Hidden, Grid, makeStyles } from "@material-ui/core";

import Search from "./panels/Search";
import DataTable from "./table/DataTable";

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
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container className={classes.dashboardGrid}>
        <Grid item xs={12} sm={12} lg={6} className={classes.table}>
          <DataTable />
        </Grid>
        <Hidden only={["xs", "sm"]}>
          <Grid item xs={false} sm={false} lg={6} elevation={6} className={classes.searchBox}>
            <Search />
          </Grid>
        </Hidden>
      </Grid>
    </Fragment>
  );
};

export default Dashboard;

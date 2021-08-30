import React, { Fragment } from "react";
import { Hidden, Grid, makeStyles } from "@material-ui/core";

import Filter from "./panels/Filter";
import DataTable from "./table/DataTable";

const useStyles = makeStyles((theme) => ({
  searchBoxGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(0.5),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Fragment>
      {/* <DataTable /> */}
      <Grid container className={classes.searchBoxGrid}>
        <Grid item xs={12} sm={12} lg={5}>
          {"Hi"}
        </Grid>
        <Hidden only={["xs", "sm"]}>
          <Grid item xs={false} sm={false} lg={7} elevation={6} square>
            <Filter />
          </Grid>
        </Hidden>
      </Grid>
    </Fragment>
  );
};

export default Dashboard;

import React, { Fragment } from "react";
import Filter from "./panels/Filter";
import DataTable from "./table/DataTable";

const Download = () => {
  return (
    <Fragment>
      <Filter />
      <DataTable />
    </Fragment>
  );
};

export default Download;

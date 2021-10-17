import React, { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Box,
  ButtonGroup,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";

const columns = [
  {
    id: "sl_no",
    label: "Sl.\u00a0No.",
    minWidth: 25,
    maxWidth: 75,
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "name", label: "Name", align: "center", minWidth: 100, maxWidth: 200 },
  {
    id: "department",
    label: "Department",
    align: "center",
    minWidth: 50,
    maxWidth: 100,
  },
  {
    id: "designation",
    label: "Designation",
    align: "center",
    minWidth: 50,
    maxWidth: 100,
  },
  {
    id: "employeeID",
    label: "Employee\u00a0ID",
    align: "center",
    minWidth: 100,
    maxWidth: 200,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: ".5rem",
  },
  container: {
    maxHeight: 440,
  },
  header: {
    color: theme.palette.primary.main,
  },
}));

function DataTable({ rows }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                    className={classes.header}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 75, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Fragment>
  );
}

export default React.memo(DataTable);

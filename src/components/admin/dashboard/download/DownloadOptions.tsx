import React from "react";
import { saveAs } from "file-saver";
import {
  Box,
  Card,
  CardContent,
  Button,
  Alert as MuiAlert,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { StatusCodes } from "http-status-codes";

/* const useStyles = makeStyles((theme) => ({
  downloadButton: {
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
})); */

interface DownloadOptionsProps {
  getFilterObject: any;
  sortRef: any;
  displayRef: any;
}

const DownloadOptions = ({
  getFilterObject,
  sortRef,
  displayRef,
}: DownloadOptionsProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const snackbarAction = (key) => (
    <Button
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      {"Dismiss"}
    </Button>
  );

  const onSuccess = () => {};
  const onError = () => {
    enqueueSnackbar("Couldn't create excel file", {
      variant: "error",
      action: snackbarAction,
    });
    throw "Server errored out";
  };

  const handleWorkbookDownloadSelected = () => {
    console.log({
      filter: getFilterObject(),
      sort: sortRef.current,
      display: displayRef.current,
    });
    fetch("/api/admin/download/selected", {
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
      .then((response) => {
        if (
          response.status === StatusCodes.OK ||
          response.status === StatusCodes.CREATED
        )
          return response.blob();
        else {
          onError();
        }
      })
      .then((blob) => {
        saveAs(blob, `SelectedUsers-${new Date().toISOString()}.xlsx`);
        enqueueSnackbar(`Succesfully excel file`, {
          variant: "success",
          action: snackbarAction,
        });
      });
  };

  const handleWorkbookDownloadAll = () => {
    fetch("/api/admin/download/all")
      .then((response) => {
        if (
          response.status === StatusCodes.OK ||
          response.status === StatusCodes.CREATED
        )
          return response.blob();
        else {
        }
      })
      .then((blob) => {
        saveAs(blob, `AllUsers-${new Date().toISOString()}.xlsx`);
      });
  };

  return (
    <Box px={1} py={2}>
      <Card variant="outlined">
        <CardContent>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleWorkbookDownloadAll}
          >
            {"Download All (EXCEL)"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleWorkbookDownloadSelected}
          >
            {"Download Selected (EXCEL)"}
          </Button>
        </CardContent>
        <CardContent>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleWorkbookDownloadAll}
          >
            {"Download All (WORD)"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleWorkbookDownloadSelected}
          >
            {"Download Selected (WORD)"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default React.memo(DownloadOptions);

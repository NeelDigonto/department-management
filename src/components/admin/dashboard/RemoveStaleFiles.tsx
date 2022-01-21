import React from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Alert as MuiAlert,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { StatusCodes } from "http-status-codes";

const RemoveStaleFiles = () => {
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

  const handleRemoveStaleFiles = () => {
    fetch("/api/file/removeStaleFiles", {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== StatusCodes.OK)
          enqueueSnackbar("Couldn't remove stale files", {
            variant: "error",
            action: snackbarAction,
          });
        return response.json();
      })
      .then((result) => {
        const deletedFileNos = result.length;

        enqueueSnackbar(`Succesfully removed ${deletedFileNos} stale files`, {
          variant: "success",
          action: snackbarAction,
        });
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
            onClick={handleRemoveStaleFiles}
          >
            {"Remove Stale Files"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RemoveStaleFiles;

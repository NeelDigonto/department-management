import React from "react";
import { saveAs } from "file-saver";
import { Box, Card, CardContent, Button, makeStyles } from "@mui/material";

/* const useStyles = makeStyles((theme) => ({
  downloadButton: {
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
})); */

const DownloadOptions = ({ getFilterObject, sortRef, displayRef }) => {
  const handleWorkbookDownloadSelected = () => {
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
        return response.blob();
      })
      .then((blob) => {
        saveAs(blob, `SelectedUsers-${new Date().toString()}.xlsx`);
      });
  };

  const handleWorkbookDownloadAll = () => {
    fetch("/api/admin/download/all")
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        saveAs(blob, `AllUsers-${new Date().toString()}.xlsx`);
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
            Download All Data
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleWorkbookDownloadSelected}
          >
            Download Selected
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default React.memo(DownloadOptions);

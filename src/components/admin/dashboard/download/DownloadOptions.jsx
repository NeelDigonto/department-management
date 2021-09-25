import React from "react";

import { Box, Card, CardContent, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  downloadButton: {
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const DownloadOptions = ({ getFilterObject, sortRef, displayRef }) => {
  const classes = useStyles();

  const handleWorkbookDownload = () => {
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
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        window.open(url, "_blank");
        URL.revokeObjectURL(url);
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
            className={classes.downloadButton}
            onClick={() => {
              window.open("/api/admin/download/all", "_blank");
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
          {/*  <Button
            variant="outlined"
            color="primary"
            fullWidth
            className={classes.downloadButton}
            onClick={handleWorkbookDownload}
          >
            Download as single-spreadsheet
          </Button> */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DownloadOptions;

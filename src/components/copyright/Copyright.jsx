import { Box, Typography, Link as MuiLink } from "@material-ui/core";

function Copyright() {
  return (
    <Box pt={8}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <MuiLink color="inherit" target="_blank" href="https://iem.edu.in/">
          {"IEM"}
        </MuiLink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default Copyright;

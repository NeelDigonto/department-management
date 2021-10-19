import React, { Fragment } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import { Card, Box, CardContent, Grid, Typography, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useUserContext } from "../../contexts/UserContext";
import { MASTER_SCHEMA } from "../../data/schema";

const DisplayProfile = ({ setIsEditing }) => {
  const { user, setUser } = useUserContext();

  const employeeID = (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {"Employee ID"}
          </Typography>
          {user["employeeID"]}
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Fragment>
      <Box pt={4}>
        {employeeID}
        {MASTER_SCHEMA["profile"].map((item) => (
          <Box key={item.db_field}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {item.label}
                </Typography>
                {user["profile"][item.db_field]}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          bottom: "2%",
          right: "4%",
        }}
      >
        <Fab
          color="primary"
          aria-label="Edit"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          <EditIcon />
        </Fab>
      </Box>
    </Fragment>
  );
};

export default DisplayProfile;

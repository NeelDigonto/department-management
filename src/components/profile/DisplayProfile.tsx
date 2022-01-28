import React, { Fragment } from "react";
import { Card, Box, CardContent, Grid, Typography, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useUserContext } from "../../contexts/UserContext";
import { MASTER_SCHEMA } from "../../data/schema";
import { INPUT_TYPE } from "../../data/types/types";

interface DisplayProfileProps {
  setIsEditing: any;
}

const DisplayProfile = ({ setIsEditing }: DisplayProfileProps) => {
  const { user, setUser } = useUserContext();

  return (
    <Fragment>
      <Box pt={4}>
        {MASTER_SCHEMA["profile"].map((item) => (
          <Card variant="outlined" key={item.db_field}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {item.label}
              </Typography>
              {item.input_type !== INPUT_TYPE.DATE
                ? user["profile"][item.db_field]
                : new Date(user["profile"][item.db_field]).toDateString()}
            </CardContent>
          </Card>
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

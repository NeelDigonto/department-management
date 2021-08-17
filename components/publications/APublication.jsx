import React, { useState } from "react";
import { Card, Box, CardContent } from "@material-ui/core";

import DisplayPublication from "./DisplayPublication.jsx";
import EditPublication from "./EditPublication.jsx";

const APublication = ({ publication, index }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Box pt={2}>
      <Card variant="outlined">
        <CardContent>
          {!isEditing ? (
            <DisplayPublication
              publication={publication}
              index={index}
              setIsEditing={setIsEditing}
            />
          ) : (
            <EditPublication publication={publication} index={index} setIsEditing={setIsEditing} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default APublication;

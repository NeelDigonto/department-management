import { Fragment, useState } from "react";
import DisplayProfile from "./DisplayProfile.jsx";
import EditProfile from "./EditProfile.jsx";
import { useUserContext } from "../../contexts/UserContext";
import { Card, Box, CardContent, Grid, Typography, Fab, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: /* theme.spacing(2) */ "4%",
  },
}));

const Profile = () => {
  const { user, setUser } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();

  return (
    <Fragment>
      {!!user ? (
        !isEditing ? (
          <DisplayProfile setIsEditing={setIsEditing} />
        ) : (
          <EditProfile />
        )
      ) : null}
    </Fragment>
  );
};

export default Profile;

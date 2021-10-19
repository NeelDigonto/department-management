import { Fragment, useState } from "react";

import DisplayProfile from "./DisplayProfile.jsx";
import EditProfile from "./EditProfile.jsx";
import { useUserContext } from "../../contexts/UserContext";

const Profile = () => {
  const { user, setUser } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Fragment>
      {!!user ? (
        !isEditing ? (
          <DisplayProfile setIsEditing={setIsEditing} />
        ) : (
          <EditProfile setIsEditing={setIsEditing} />
        )
      ) : null}
    </Fragment>
  );
};

export default Profile;

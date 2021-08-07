import { Fragment, useState } from "react";
import DisplayProfile from "./DisplayProfile.jsx";
import { useUserContext } from "../../contexts/UserContext";

const Profile = () => {
  const { user, setUser } = useUserContext();

  return <Fragment>{!!user ? <DisplayProfile /> : null}</Fragment>;
};

export default Profile;

import React, { Fragment } from "react";
import DisplayPublication from "./DisplayPublication";
import { useUserContext } from "../../contexts/UserContext";

const Publications = () => {
  const { user, setUser } = useUserContext();

  return <Fragment>{!!user ? <DisplayPublication /> : null}</Fragment>;
};

export default Publications;

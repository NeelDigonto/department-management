import React, { Fragment, useEffect, useState, useMemo } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import { DataTypes, sidebarOptions, schema } from "../../data/schema.js";
import { useUserContext } from "../../contexts/UserContext.jsx";

const UserDataLoader = ({ children }) => {
  const [session, loading] = useSession();
  const { user, setUser } = useUserContext();
  const [lastSession, setLastSession] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    //dont use db_field here as key
    if (!!session && !loading && session.user.isAdmin === false) {
      const employeeID = session.user.employeeID;

      // stops useless data fetching
      if (!!lastSession && employeeID === lastSession.user.employeeID && forceUpdate === false)
        return;
      else setLastSession(session);

      fetch(`/api/user/getFullData/${employeeID}`)
        .then((response) => response.json())
        .then((result) => {
          console.log("Data Fetched");
          setUser(result);
          setForceUpdate(false);
        });
    }
  }, [session, loading]);

  return <Fragment>{children}</Fragment>;
};

export default UserDataLoader;

//check why its updating so many times

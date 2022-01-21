import React, { Fragment, useEffect, useState, useMemo } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { ReasonPhrases, StatusCodes, getReasonPhrase } from "http-status-codes";

import { useUserContext } from "../../contexts/UserContext";

const UserDataLoader = ({ children }) => {
  const [session, loading] = useSession();
  const { user, setUser } = useUserContext();
  const [lastSession, setLastSession] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    if (!!session && !loading && session.user.isAdmin === false) {
      const employeeID = session.user.employeeID;

      // stops useless data fetching
      if (
        !!lastSession &&
        employeeID === lastSession.user.employeeID &&
        forceUpdate === false
      )
        return;
      else setLastSession(session);

      // if error re request data

      console.log(`/api/user/${employeeID}/data/get/full`);
      fetch(`/api/user/${employeeID}/data/get/full`)
        .then((response) => {
          if (response.status === StatusCodes.OK) return response.json();
          else
            throw ` Server responded with: ${getReasonPhrase(response.status)}`;
        })
        .then((result) => {
          setUser(result);
          setForceUpdate(false);
        });
    }
    return () => {
      setUser(false);
    };
  }, [session, loading]);

  return <Fragment>{children}</Fragment>;
};

export default UserDataLoader;

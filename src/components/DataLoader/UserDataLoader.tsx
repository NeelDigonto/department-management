import React, { Fragment, useEffect, useState, useMemo } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { ReasonPhrases, StatusCodes, getReasonPhrase } from "http-status-codes";
import * as Constants from "../../lib/Constants";

import { useUserContext } from "../../contexts/UserContext";

const UserDataLoader = ({ children }) => {
  const [session, loading] = useSession();
  const { user, setUser } = useUserContext();
  const [lastSession, setLastSession] = useState(null);
  //const [forceUpdate, setForceUpdate] = useState(false);

  function getData(employeeID: string) {
    fetch(`/api/user/${employeeID}/data/get/full`)
      .then((response) => {
        if (response.status === StatusCodes.OK) return response.json();
        else
          throw ` Server responded with: ${getReasonPhrase(response.status)}`;
      })
      .then((result) => {
        setUser(result);
        console.log(result);
      });
  }

  useEffect(() => {
    if (!!session && !loading) {
      const employeeID = session.user.employeeID;
      // stops useless data fetching
      if (!!lastSession && employeeID === lastSession.user.employeeID) return;

      if (session.user.isAdmin === false) {
        setLastSession(session);

        // TODO: if error re-request data
        getData(employeeID);
      } else {
        setLastSession(session);

        // TODO: if error re-request data
        getData(Constants.CENTRAL_EMPLOYEE_ID);
      }
    }
    return () => {
      //setUser(false);
    };
  }, [session, loading]);

  return <Fragment>{children}</Fragment>;
};

export default UserDataLoader;

import React, { Fragment, useMemo, useState, useEffect, useRef } from "react";

//import { FullName, OfficialEmail, BloodGroup, DateOfBirth } from "./fields/ProfileFields";
import CreatePublication from "./CreatePublication";
import APublication from "./APublication";
import Card from "../ui/card/Card";
import { useUserContext } from "../../contexts/UserContext";

import styles from "./Publications.module.css";

const Profile = ({}) => {
  const { user, setUser } = useUserContext();
  return (
    <div className={styles.Publications__root_div}>
      {!!user ? (
        <Fragment>
          {user["Publications"].map((element, index) => (
            <APublication element={element} key={index} index={index} />
          ))}
          <CreatePublication />
        </Fragment>
      ) : null}
    </div>
  );
};

export default Profile;

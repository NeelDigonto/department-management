import React, { Fragment, useMemo, useState, useEffect, useRef } from "react";

//import { FullName, OfficialEmail, BloodGroup, DateOfBirth } from "./fields/ProfileFields";
import CreatePublication from "./CreatePublication";
import Card from "../ui/card/Card";
import { useUserContext } from "../../contexts/UserContext";
import { NameOfAuth } from "./fields/PublicationFields.jsx";

import styles from "./Publications.module.css";

const Profile = ({}) => {
  const { user, setUser } = useUserContext();

  console.log(user);
  return (
    <div className={styles.Publications__root_div}>
      <Fragment>
        {user["Publications"].map((element, index) => {
          <Card>
            <NameOfAuth index={index} />
          </Card>;
        })}
        <CreatePublication />
      </Fragment>
    </div>
  );
};

export default Profile;

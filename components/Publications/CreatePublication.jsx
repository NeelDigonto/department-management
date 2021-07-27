import React, { useState, useEffect } from "react";
import styles from "./CreatePublication.module.css";
import { useUserContext } from "../../contexts/UserContext";

const emptyPublicationDataBP = {
  sl_no: 0,
  name_of_auth: "",
  yop: "",
  title: "",
  journal_name: "",
  nat_inter_imp: "",
  impact_factor: "",
  vol_issue_no: "",
  issn_isbn: "",
  indexing: "",
  inv_paper: false,
  prof_inv_file: null,
  studs_involved: "",
  attachments: [],
};

const CreatePublication = () => {
  const { user, setUser } = useUserContext();

  const [isCreatingPublication, setIsCreatingPublication] = useState(false);

  const createPublicationHandler = async () => {
    setIsCreatingPublication(true);

    const emptyPublicationData = { ...emptyPublicationDataBP, sl_no: user["Publications"].length };
    fetch("/api/user/editData/publications/create_new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeID: user.employeeID,
        emptyPublicationData: emptyPublicationData,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.created === true) {
          console.log("Publication created");
          setUser((oldState) => {
            let newState = { ...oldState };
            newState["Publications"].push(emptyPublicationData);
            setIsCreatingPublication(false);
            return newState;
          });
        } else {
          console.log("Couldn't create publication");
          setIsCreatingPublication(false);
        }
      });
  };

  return (
    <button
      className={styles.Publication__create_button}
      disabled={isCreatingPublication}
      onClick={createPublicationHandler}
    >
      Add new Publication
    </button>
  );
};

export default CreatePublication;

/*   const createPublicationHandler = async () => {
    fetch("/api/user/editData/publications/create_new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeID: user.employeeID,
        emptyPublicationData: emptyPublicationData,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.created === true) console.log("Publication created");
        setUser((oldState) => {
          let newState = { ...oldState };
          emptyPublicationData.sl_no = user["Publications"].length;
          newState["Publications"].push(emptyPublicationData);
          return newState;
        });
      });
  }; */

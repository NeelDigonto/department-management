import React from "react";
import styles from "./CreatePublication.module.css";
import { useUserContext } from "../../contexts/UserContext";

let emptyPublicationData = {
  sl_no: 0,
  name_of_auh: "",
  yop: "",
  title: "",
  journal_name: "",
  nat_inter_imp: "",
  impact_factor: "",
  vol_issue_no: "",
  issn_isbn: "",
  indexing: "",
  inv_paper: "",
  prof_inv_file: null,
  studs_involved: "",
  attachments: [],
};

const CreatePublication = () => {
  const { user, setUser } = useUserContext();
  emptyPublicationData.sl_no = user["Publications"].length;

  const createPublicationHandler = async () => {
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
          newState["Publications"].push(emptyPublicationData);
          return newState;
        });
      });
  };

  return (
    <div className={styles.Publication__root_div} onClick={createPublicationHandler}>
      Add new Publication
    </div>
  );
};

export default CreatePublication;

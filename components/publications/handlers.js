import { v4 as uuidv4 } from "uuid";
import { MASTER_SCHEMA } from "../../data/schema";
import axios from "axios";

const createPublicationHandler = async (employeeID, setUser, setIsCreatingPublication) => {
  const getEmptyPublicationDataBP = () => {
    let emptyPublicationDataBP = {};
    MASTER_SCHEMA["publications"]["fields"].forEach((item) => {
      emptyPublicationDataBP[item.db_field] = item.value;
    });
    emptyPublicationDataBP["id"] = uuidv4();
    emptyPublicationDataBP["last_modified"] = new Date();
    return emptyPublicationDataBP;
  };

  const emptyPublicationDataBP = getEmptyPublicationDataBP();

  setIsCreatingPublication(true);
  const emptyPublicationData = { ...emptyPublicationDataBP };
  fetch("/api/user/editData/publications/create_new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employeeID: employeeID,
      emptyPublicationData: emptyPublicationData,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.created === true) {
        setUser((oldState) => {
          let newState = { ...oldState };
          newState["publications"].push(emptyPublicationData);
          setIsCreatingPublication(false);
          return newState;
        });
      } else {
        console.log("Couldn't create publication");
        setIsCreatingPublication(false);
      }
    });
};

const deletePublicationHandler = async (employeeID, id_to_delete, setUser) => {
  fetch("api/user/editData/publications/delete", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ employeeID: employeeID, delete_id_no: id_to_delete }),
  })
    .then((respone) => respone.json())
    .then((result) => {
      if (result.deleted) {
        setUser((oldState) => {
          let newState = { ...oldState };
          newState["publications"] = newState["publications"].filter(
            (item) => item.id !== id_to_delete
          );
          return newState;
        });
      } else {
        console.error("pub not deleted");
        console.log(result.updateResult);
      }
    });
};

const editPublicationHandler = async (
  employeeID,
  publication_id,
  index,
  values,
  { setSubmitting },
  setUser,
  setIsEditing
) => {
  setSubmitting(true);
  axios({
    url: "api/user/editData/publications/edit",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      employeeID: employeeID,
      pub_id_no_to_update: publication_id,
      updateObject: values,
    },
  })
    .then((response) => response.data)
    .then((result) => {
      if (result.isUpdated === true) {
        setUser((oldState) => {
          let newState = { ...oldState };
          newState["publications"][index] = {
            ...newState["publications"][index],
            ...values,
          };
          return newState;
        });
      }
    })
    .then(() => {
      setSubmitting(false);
      setIsEditing(false);
    });
};

export { createPublicationHandler, deletePublicationHandler, editPublicationHandler };

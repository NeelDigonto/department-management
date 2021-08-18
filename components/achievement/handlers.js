import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { MASTER_SCHEMA } from "../../data/schema";

const createAchievementHandler = async (
  employeeID,
  setUser,
  setIsCreatingAchievement,
  achievementCategory
) => {
  const getEmptyAchievementData = () => {
    let emptyAchievementData = {};
    MASTER_SCHEMA[achievementCategory]["fields"].forEach((field) => {
      emptyAchievementData[field.db_field] = field.value;
    });
    emptyAchievementData["id"] = uuidv4();
    emptyAchievementData["last_modified"] = new Date();
    return emptyAchievementData;
  };

  setIsCreatingAchievement(true);
  const emptyAchievementData = getEmptyAchievementData();
  fetch(`/api/user/editData/${achievementCategory}/create_new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employeeID: employeeID,
      emptyAchievementData: emptyAchievementData,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.created === true) {
        setUser((oldState) => {
          let newState = { ...oldState };
          newState[achievementCategory].push(emptyAchievementData);
          setIsCreatingAchievement(false);
          return newState;
        });
      } else {
        console.log("Couldn't create " + achievementCategory);
        setIsCreatingAchievement(false);
      }
    });
};

const deleteAchievementHandler = async (employeeID, id_to_delete, setUser, achievementCategory) => {
  fetch(`api/user/editData/${achievementCategory}/delete`, {
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
          newState[achievementCategory] = newState[achievementCategory].filter(
            (item) => item.id !== id_to_delete
          );
          return newState;
        });
      } else {
        console.error(achievementCategory + " not deleted");
        console.log(result.updateResult);
      }
    });
};

const editAchievementHandler = async (
  employeeID,
  achievement_id,
  index,
  values,
  { setSubmitting },
  setUser,
  setIsEditing,
  achievementCategory
) => {
  setSubmitting(true);
  axios({
    url: `api/user/editData/${achievementCategory}/edit`,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      employeeID: employeeID,
      delete_id_no: achievement_id,
      updateObject: values,
    },
  })
    .then((response) => response.data)
    .then((result) => {
      if (result.isUpdated === true) {
        setUser((oldState) => {
          let newState = { ...oldState };
          newState[achievementCategory][index] = {
            ...newState[achievementCategory][index],
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

export { createAchievementHandler, deleteAchievementHandler, editAchievementHandler };

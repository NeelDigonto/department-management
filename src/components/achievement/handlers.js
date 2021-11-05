import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

import { MASTER_SCHEMA } from "../../../src/data/schema.js";

const getEmptyAchievementData = (achievementCategory) => {
  let emptyAchievementData = {};
  MASTER_SCHEMA[achievementCategory]["fields"].forEach((field) => {
    emptyAchievementData[field.db_field] = field.value;
  });
  emptyAchievementData["id"] = uuidv4();
  emptyAchievementData["last_modified"] = new Date().toISOString();
  return emptyAchievementData;
};

const hotCreateAchievementHandler = async (
  employeeID,
  setUser,
  setIsCreatingAchievement,
  achievementCategory
) => {
  setIsCreatingAchievement(true);

  setUser((oldState) => {
    let newState = { ...oldState };
    // get the created one from server
    if (!!newState[achievementCategory])
      newState[achievementCategory].push({
        ...getEmptyAchievementData(achievementCategory),
        isHotNew: true,
      });
    else
      newState[achievementCategory] = [
        {
          ...getEmptyAchievementData(achievementCategory),
          isHotNew: true,
        },
      ];

    return newState;
  });
};

const createAchievementFinalizeHandler = async ({
  employeeID,
  index,
  values,
  setSubmitting,
  setIsCreatingAchievement,
  setUser,
  setIsEditing,
  achievementCategory,
}) => {
  delete values.isHotNew;
  setSubmitting(true);
  fetch(`/api/user/${employeeID}/data/edit/${achievementCategory}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newObject: values,
    }),
  })
    .then((response) => {
      if (response.status === StatusCodes.CREATED) return response.json();
      else {
        console.warn("Couldn't create " + achievementCategory);
        throw `Server responded with: ${getReasonPhrase(response.status)}`;
      }
    })
    .then((result) => {
      setUser((oldState) => {
        let newState = { ...oldState };
        if (newState[achievementCategory].length >= index) {
          newState[achievementCategory].splice(index, 1);
        }
        // get the created one from server
        if (!!newState[achievementCategory])
          newState[achievementCategory].push(result.createdAchievement);
        else newState[achievementCategory] = [result.createdAchievement];

        setIsCreatingAchievement(false);

        return newState;
      });

      setIsEditing(false);
      setIsCreatingAchievement(false);
    });
  setSubmitting(false);
};

const deleteAchievementHandler = async (
  employeeID,
  id_to_delete,
  setUser,
  achievementCategory
) => {
  fetch(
    `/api/user/${employeeID}/data/edit/${achievementCategory}/delete/${id_to_delete}`,
    {
      method: "DELETE",
    }
  ).then((response) => {
    if (response.status === StatusCodes.OK) {
      setUser((oldState) => {
        let newState = { ...oldState };
        newState[achievementCategory] = newState[achievementCategory].filter(
          (item) => item.id !== id_to_delete
        );
        return newState;
      });
    } else {
      console.error("Couldn't delete a " + achievementCategory);
      throw `Server responded with: ${getReasonPhrase(response.status)}`;
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
  fetch(
    `/api/user/${employeeID}/data/edit/${achievementCategory}/edit/${achievement_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updateObject: values,
      }),
    }
  )
    .then((response) => {
      if (response.status === StatusCodes.OK) return response.json();
      else {
        console.warn("Couldn't edit " + achievementCategory);
        throw `Server responded with: ${getReasonPhrase(response.status)}`;
      }
    })
    .then((result) => {
      setUser((oldState) => {
        let newState = { ...oldState };
        newState[achievementCategory][index] = result.updatedAchievement;
        return newState;
      });
      setSubmitting(false); //formik one
      setIsEditing(false);
    });
};

export {
  hotCreateAchievementHandler,
  createAchievementFinalizeHandler,
  deleteAchievementHandler,
  editAchievementHandler,
};

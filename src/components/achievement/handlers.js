import { StatusCodes, getReasonPhrase } from "http-status-codes";

const createAchievementHandler = async (
  employeeID,
  setUser,
  setIsCreatingAchievement,
  achievementCategory
) => {
  setIsCreatingAchievement(true);
  fetch(`/api/user/${employeeID}/data/edit/${achievementCategory}/create`, {
    method: "POST",
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
        // get the created one from server
        if (!!newState[achievementCategory])
          newState[achievementCategory].push(result.createdAchievement);
        else newState[achievementCategory] = [result.createdAchievement];

        setIsCreatingAchievement(false);
        return newState;
      });
    });
};

const deleteAchievementHandler = async (employeeID, id_to_delete, setUser, achievementCategory) => {
  fetch(`/api/user/${employeeID}/data/edit/${achievementCategory}/delete/${id_to_delete}`, {
    method: "DELETE",
  }).then((response) => {
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
  fetch(`/api/user/${employeeID}/data/edit/${achievementCategory}/edit/${achievement_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      updateObject: values,
    }),
  })
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
        /* newState[achievementCategory][index] = {
          ...newState[achievementCategory][index],
          ...result.updatedAchievement,
        }; */
        newState[achievementCategory][index] = result.updatedAchievement;
        return newState;
      });
      setSubmitting(false);
      setIsEditing(false);
    });
};

export { createAchievementHandler, deleteAchievementHandler, editAchievementHandler };

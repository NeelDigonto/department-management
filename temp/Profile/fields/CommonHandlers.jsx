import Image from "next/image";
import React, { Fragment } from "react";
import styles from "./Fields.module.css";

import editIcon from "../../../public/icons/edit.png";
import applyIcon from "../../../public/icons/checked.png";
import cancelIcon from "../../../public/icons/remove.png";

const getNodes = (data, user, setUser, value, setValue, isBeingEdited, setIsBeingEdited) => {
  const onApplyHandler = async () => {
    fetch("/api/user/editData/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeID: user.employeeID,
        fieldToUpdate: data.db_field,
        newValue: value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setIsBeingEdited(false);
        // also set the user field
        if (result.status === true) {
          setUser((oldSate) => {
            let newState = { ...oldSate };
            newState["Profile"][data.db_field] = value;
            return newState;
          });
        }
      });
  };

  const applyButton = (
    <span
      className={styles.Fields__edit_icon}
      id={user["Profile"][data.db_field]} /* later make an id for each element */
      onClick={onApplyHandler}
      label="Apply changes"
    >
      <Image
        src={applyIcon}
        alt="Apply icon"
        layout="responsive"
        quality={100}
        unoptimized={true}
        label="Apply changes"
      ></Image>
    </span>
  );

  const cancelButton = (
    <span
      className={styles.Fields__edit_icon}
      id={user["Profile"][data.db_field]} /* later make an id for each element */
      onClick={() => {
        setIsBeingEdited(false);
        setValue(user["Profile"][data.db_field]);
      }}
      label="Cancel changes"
    >
      <Image
        src={cancelIcon}
        alt="Edit icon"
        layout="responsive"
        quality={100}
        unoptimized={true}
        label="Cancel changes"
      ></Image>
    </span>
  );

  const getInputElement = () => {
    switch (data.input_type) {
      case "text": {
        const ret_val = (
          <input
            type="text"
            value={value}
            name={data.db_field}
            onChange={(event) => {
              const value = event.target.value;
              setValue(value);
            }}
            className={styles.Fields__input_general}
          ></input>
        );
        return ret_val;
      }
      case "email": {
        const ret_val = (
          <input
            type="email"
            value={value}
            name={data.db_field}
            onChange={(event) => {
              const value = event.target.value;
              setValue(value);
            }}
            className={styles.Fields__input_general}
          ></input>
        );
        return ret_val;
      }
      case "select": {
        const ret_val = (
          <select
            value={value}
            name={data.db_field}
            onChange={(event) => {
              const value = event.target.value;
              setValue(value);
            }}
            className={styles.Fields__input_general}
          >
            {data.options.map((element, index) => (
              <option value={element} key={index}>
                {element}
              </option>
            ))}
          </select>
        );
        return ret_val;
      }
      case "date": {
        const ret_val = (
          <input
            type="date"
            value={value}
            name={data.db_field}
            onChange={(event) => {
              const value = event.target.value;
              setValue(value);
            }}
            className={styles.Fields__input_general}
          ></input>
        );
        return ret_val;
      }
      default: {
        return null;
      }
    }
  };

  const inputNode = (
    <Fragment>
      {getInputElement()}
      {applyButton}
      {cancelButton}
    </Fragment>
  );

  return { onApplyHandler, applyButton, cancelButton, inputNode };
};

export { getNodes };

import React from "react";
import styles from "./Button.module.css";

function Button({ children, onClick, active }) {
  return (
    <button
      onClick={(event) => {
        onClick(event);
      }}
      className={
        active !== null && active
          ? `${styles.button_style} ${styles.selected}`
          : `${styles.button_style}`
      }
    >
      {children}
    </button>
  );
}

export default Button;

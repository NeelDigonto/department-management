import React from "react";
import styles from "./DefaultContainer.module.css";
function DefaultContainer({ children }) {
  return <div className={styles.root_container}>{children}</div>;
}

export default DefaultContainer;

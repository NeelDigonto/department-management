import React from "react";
import styles from "./Card.module.css";

const Card = ({ children, title }) => {
  return (
    <div className={styles.Card__root_div} title={title}>
      {children}
    </div>
  );
};

export default Card;

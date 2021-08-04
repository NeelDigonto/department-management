import React from "react";
import styles from "./InfoField.module.css";

const InfoField = ({ label, value }) => {
  return (
    <div className={styles.InfoField__field_container}>
      <div className={styles.InfoField__field_label}>{label}</div>
      <div className={styles.InfoField__field_value}>{value}</div>
    </div>
  );
};

export default InfoField;

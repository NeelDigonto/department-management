import React from "react";
import styles from "./InputNumber.module.css";

const InputNumber = ({
  chlidren,
  id,
  name,
  placeholder,
  label,
  value,
  handleChange,
  handleBlur,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export { InputNumber };

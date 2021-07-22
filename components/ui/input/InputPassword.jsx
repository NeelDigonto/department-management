import React from "react";
import styles from "./InputNumber.module.css";

const autoCompleteTypes = {
  on: "on",
  off: "off",
  currentPassword: "current-password",
  newPassword: "new-password",
};

const InputPassword = ({
  chlidren,
  id,
  name,
  placeholder,
  label,
  value,
  handleChange,
  handleBlur,
  autoComplete = "current-password",
  isVisible = false,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export { InputPassword, autoCompleteTypes };

import React from "react";
import styles from "./UnniversityOptions.module.css";
import Button from "./ui/buttons/Button.jsx";

function UnniversityOptions({
  unniversities,
  name,
  value,
  onChange,
  onBlur,
  /*   selectedUnniversity,
  setSelectedUnniversity, */
}) {
  let options = [];
  for (let [key, unniv_name] of unniversities) {
    options.push(
      <Button
        key={key}
        onClick={(event) => {
          event.preventDefault();
          const syntheticEventObject = { target: { name: name, value: key } };
          onChange(syntheticEventObject);
        }}
        active={value === key ? true : false}
      >
        {unniv_name}
      </Button>
    );
  }

  return <div className={styles.root_container}>{options}</div>;
}

export default UnniversityOptions;

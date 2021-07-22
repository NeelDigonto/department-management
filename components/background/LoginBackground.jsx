import React from "react";

import styles from "./LoginBackground.module.css";

function LoginBackground({ children }) {
  return <div className={styles.root_div}>{children}</div>;
}

export default LoginBackground;

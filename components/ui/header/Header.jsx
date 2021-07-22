import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.header__root_container}>IEM | FACULTY BOOK</div>
    </header>
  );
};

export default Header;

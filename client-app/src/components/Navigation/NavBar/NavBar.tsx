import React from "react";
import classes from "./NavBar.module.css";
import NavBarItems from "../NavBarItems/NavBarItems";
import Logo from "../../Logo/Logo";

const NavBar = (props: any) => {
  return (
    <header className={classes.NavBar}>
      <h1>PRODUCE NINJA</h1>
      <Logo />
      <nav>
        <NavBarItems />
      </nav>
    </header>
  );
};

export default NavBar;

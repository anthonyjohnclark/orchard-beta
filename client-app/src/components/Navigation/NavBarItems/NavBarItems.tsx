import React from "react";
import classes from "./NavBarItems.module.css";
import NavBarItem from "./NavBarItem/NavBarItem";

const NavBarItems = () => {
  return (
    <ul className={classes.NavBarItems}>
      <NavBarItem link="/" active={true}>
        Inventory & Order
      </NavBarItem>
      <NavBarItem link="/">Sales & Shrink</NavBarItem>
      <NavBarItem link="/">On the Floor</NavBarItem>
    </ul>
  );
};

export default NavBarItems;

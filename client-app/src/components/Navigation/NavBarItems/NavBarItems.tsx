import React from "react";
import classes from "./NavBarItems.module.css";
import NavBarItem from "./NavBarItem/NavBarItem";

const NavBarItems = () => {
  return (
    <ul className={classes.NavBarItems}>
      <NavBarItem link="/salesShrink">Sales & Shrink</NavBarItem>
      <NavBarItem link="/onTheFloor">On the Floor</NavBarItem>
      <NavBarItem link="/laborTasks">Labor & Tasks</NavBarItem>
      <NavBarItem link="/">Inventory & Order</NavBarItem>
    </ul>
  );
};

export default NavBarItems;

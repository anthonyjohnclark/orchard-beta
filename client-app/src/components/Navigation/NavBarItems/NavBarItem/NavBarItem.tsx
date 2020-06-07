import React from "react";
import classes from "./NavBarItem.module.css";

const NavBarItem = (props: any) => {
  return (
    <li className={classes.NavBarItem}>
      <a href={props.link} className={props.active ? classes.active : null}>
        {props.children}
      </a>
    </li>
  );
};

export default NavBarItem;

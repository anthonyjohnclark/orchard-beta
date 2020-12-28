import React from "react";
import classes from "./NavBarItem.module.css";
import { NavLink } from "react-router-dom"

const NavBarItem = (props: any) => {
  return (
    <li className={classes.NavBarItem}>
      <NavLink 
      to={props.link}
      activeClassName={classes.active}
      exact
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavBarItem;

import React from "react";
import classes from "./SortFilterButton.module.css";

let SortFilterButton = (props: any) => {
  return (
    <button
      className={props.dropdown === false ? classes.SortButton : classes.Active}
      onClick={() => props.toggleDropdown(!props.dropdown)}
    >
      ☰ Sort
    </button>
  );
};

export default SortFilterButton;

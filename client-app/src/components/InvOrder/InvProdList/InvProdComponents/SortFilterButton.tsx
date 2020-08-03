import React from "react";
import classes from "./SortFilterButton.module.css";

let SortFilterButton = (props: any) => {
  console.log(props.filterEnabled);

  return (
    <button
      className={props.dropdown === false ? classes.SortButton : classes.Active}
      onClick={() => props.toggleDropdown(!props.dropdown)}
    >
      <div>
        <span
          onClick={(e) => {
            props.setFilterEnabled(props.filterEnabled, e);
          }}
        >
          {props.filterEnabled ? <span>▼</span> : <span>☰</span>}
        </span>{" "}
        {props.filterEnabled ? <span>Filter</span> : <span>Sort</span>}
      </div>
    </button>
  );
};

export default SortFilterButton;

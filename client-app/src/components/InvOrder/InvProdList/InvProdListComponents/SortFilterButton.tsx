import React from "react";
import classes from "./SortFilterButton.module.css";

interface IProps {
  filterEnabled: boolean; 
  setFilterEnabled: (filterEnabled: boolean, e:React.MouseEvent<HTMLSpanElement, MouseEvent>) => void; 
  dropdown: boolean; 
  toggleDropdown: React.Dispatch<React.SetStateAction<boolean>>
  activeSort:{buttonKey: number;}
}

let SortFilterButton: React.FC<IProps> = ({
  filterEnabled,
  setFilterEnabled, 
  dropdown, 
  toggleDropdown,
  activeSort }) => {

  return (
    <button
      className={
        dropdown === true || activeSort.buttonKey
          ? classes.Active
          : classes.SortButton
      }
      onClick={() => toggleDropdown(!dropdown)}
    >
      <div>
        <span
          onClick={(e) => {
            setFilterEnabled(filterEnabled, e);
          }}
        >
          {filterEnabled ? <span>▼</span> : <span>☰</span>}
        </span>{" "}
        {filterEnabled ? <span>Filter</span> : <span>Sort</span>}
      </div>
    </button>
  );
};

export default SortFilterButton;

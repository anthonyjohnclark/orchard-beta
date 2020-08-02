import React from "react";
import classes from "./SearchBar.module.css";

const SearchBar = (props: any) => {
  const setNewSearch = (text: any) => {
    props.onChange(text.target.value);
  };

  return (
    <div className={classes.SearchBar}>
      <div className={classes.SearchBarText}>
        <p>Search</p>
      </div>
      <input
        type="text"
        placeholder="by Name or VIN..."
        onChange={(text) => props.onChange(text.target.value)}
      />
    </div>
  );
};

export default SearchBar;

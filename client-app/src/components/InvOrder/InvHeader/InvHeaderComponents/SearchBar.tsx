import React from "react";
import classes from "./SearchBar.module.css";

const SearchBar = (props: any) => {
  return (
    <div className={classes.SearchBar}>
      <div className={classes.SearchBarText}>
        <p>Search</p>
      </div>
      <input
        type="text"
        placeholder="by Name or VIN..."
        onChange={(text) => props.setNewSearch(text.target.value)}
      />
    </div>
  );
};

export default SearchBar;

import React from "react";
import classes from "./SearchBar.module.css";

interface IProps {
  setNewSearch: (newSearchText: string) => void;
}

const SearchBar: React.FC<IProps> = ({setNewSearch}) => {
  return (
    <div className={classes.SearchBar}>
      <div className={classes.SearchBarText}>
        <p>Search</p>
      </div>
      <input
        type="text"
        placeholder="by Name or VIN..."
        onChange={(text) => setNewSearch(text.target.value)}
      />
    </div>
  );
};

export default SearchBar;

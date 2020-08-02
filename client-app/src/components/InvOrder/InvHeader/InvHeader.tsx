import React, { useState } from "react";
import InvProdList from "../InvProdList/InvProdList";
import classes from "../InvHeader/InvHeader.module.css";
import Countdown from "./Countdown";
import Auxil from "../../../hoc/Auxil";

const InvHeader = (props: any) => {
  const { products } = props;

  const [searchText, setSearch] = useState("");

  let filteredProducts = [...products].filter((products) => {
    return (
      products.name.toString().toLowerCase().indexOf(searchText) >= 0 ||
      products.id.toString().indexOf(searchText) >= 0
    );
  });

  return (
    <Auxil className={classes.InvHeader}>
      <Countdown />
      <div className={classes.SearchBar}>
        <div className={classes.SearchBarText}>
          <p>Search</p>
        </div>
        <input
          type="text"
          placeholder="by Name or VIN..."
          onChange={(text) => setSearch(text.target.value)}
        />
      </div>
      <InvProdList products={filteredProducts} />
    </Auxil>
  );
};

export default InvHeader;

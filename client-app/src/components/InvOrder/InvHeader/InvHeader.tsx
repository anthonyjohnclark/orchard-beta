import React, { useState } from "react";
import InvProdList from "../InvProdList/InvProdList";
import classes from "../InvHeader/InvHeader.module.css";
import Countdown from "./InvHeaderComponents/Countdown";
import SearchBar from "./InvHeaderComponents/SearchBar";
import Auxil from "../../../hoc/Auxil";

const InvHeader = (props: any) => {
  const { products } = props;

  const [searchText, setSearch] = useState("");

  const setNewSearch = (newSearchText: any) => {
    setSearch(newSearchText);
  };

  let filteredProducts = [...products].filter((products) => {
    return (
      products.name.toString().toLowerCase().indexOf(searchText) >= 0 ||
      products.id.toString().indexOf(searchText) >= 0
    );
  });

  return (
    <Auxil className={classes.InvHeader}>
      <Countdown />
      <SearchBar searchText={searchText} onChange={setNewSearch} />
      <InvProdList products={filteredProducts} />
    </Auxil>
  );
};

export default InvHeader;

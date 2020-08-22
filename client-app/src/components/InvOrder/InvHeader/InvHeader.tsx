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

  const [filterConfig, setFilterConfig] = useState(props);

  const requestFilterConfig = (id: any, primaryKey: any, secondaryKey: any) => {
    setFilterConfig({ id, primaryKey, secondaryKey });
  };

  console.log(filterConfig);

  let searchfilteredProducts = [...products].filter((products) => {
    return (
      products.name.toString().toLowerCase().indexOf(searchText) >= 0 ||
      products.id.toString().indexOf(searchText) >= 0
    );
  });

  let filteredProducts = [...searchfilteredProducts].filter((products) => {
    if (filterConfig !== 0) {
      switch (filterConfig.id) {
        case 1:
          return products[filterConfig.primaryKey];
        case 2:
        case 4:
        case 5:
          return (
            products[filterConfig.primaryKey] &&
            products[filterConfig.secondaryKey]
          );
        case 3:
          return (
            products[filterConfig.primaryKey] &&
            !products[filterConfig.secondaryKey]
          );
        case 6:
        case 7:
        case 9:
          return (
            !products[filterConfig.primaryKey] &&
            products[filterConfig.secondaryKey]
          );
        case 8:
          return (
            !products[filterConfig.primaryKey] &&
            !products[filterConfig.secondaryKey]
          );
        case 10:
          return !products[filterConfig.primaryKey];
      }
    }
    return [...searchfilteredProducts];
  });

  return (
    <Auxil className={classes.InvHeader}>
      <Countdown />
      <SearchBar searchText={searchText} setNewSearch={setNewSearch} />
      <InvProdList
        products={filteredProducts}
        requestFilterConfig={requestFilterConfig}
        filterConfig={filterConfig}
      />
    </Auxil>
  );
};

export default InvHeader;

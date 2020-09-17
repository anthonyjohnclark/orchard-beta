import React, { useState, useEffect } from "react";
import InvProdList from "../InvProdList/InvProdList";
import classes from "../InvHeader/InvHeader.module.css";
import Countdown from "./InvHeaderComponents/Countdown";
import SearchBar from "./InvHeaderComponents/SearchBar";
import SalesPredictor from "./InvHeaderComponents/SalesPredictor";
import TodaysSales from "./InvHeaderComponents/TodaysSales";

const InvHeader = (props: any) => {
  //here we need to create a new array with blank fields for each product object
  let productsNew = props.products.map((products: any) => ({
    ...products,
    order: "",
    sell: "",
    selling: "",
    suggested: "",
  }));

  console.log(productsNew);

  const [inputs, setProductInput] = useState(productsNew);

  console.log(inputs);

  const updateInputChanged = (index: any) => (e: any) => {
    console.log("index: " + index);
    console.log("property name: " + e.target.name);
    console.log("value: " + e.target.value);

    console.log(inputs);

    let productsWithInput = [...inputs];
    productsWithInput[index].order = e.target.value;
    setProductInput(productsWithInput);
  };

  //update the initial state of inputs just once when it's blank to be a copy of the new array
  useEffect(() => {
    if (inputs.length < 1) {
      setProductInput([...productsNew]);
    }
  }, [inputs, setProductInput]);

  const [searchText, setSearch] = useState("");

  const setNewSearch = (newSearchText: any) => {
    setSearch(newSearchText);
  };

  const [salesPrediction, setSalesPrediction] = useState("");

  const setNewSalesPrediction = (newSalesNumber: any) => {
    setSalesPrediction(newSalesNumber);
  };

  console.log(salesPrediction);

  const [todaysSales, setTodaysSales] = useState("");

  const setNewTodaysSales = (newToddaysSales: any) => {
    setTodaysSales(newToddaysSales);
  };

  const [filterConfig, setFilterConfig] = useState(props);

  const requestFilterConfig = (id: any, primaryKey: any, secondaryKey: any) => {
    setFilterConfig({ id, primaryKey, secondaryKey });
  };

  // console.log(filterConfig);

  let searchfilteredProducts = inputs.filter((products: any) => {
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
    <div>
      <div className={classes.InvHeader}>
        <Countdown />
        <SalesPredictor
          setNewSalesPrediction={setNewSalesPrediction}
          salesPrediction={salesPrediction}
        />
        <TodaysSales
          setNewTodaysSales={setNewTodaysSales}
          todaysSales={todaysSales}
        />
        <SearchBar searchText={searchText} setNewSearch={setNewSearch} />
      </div>
      <InvProdList
        updateInputChanged={updateInputChanged}
        products={filteredProducts}
        requestFilterConfig={requestFilterConfig}
        filterConfig={filterConfig}
        setFilterConfig={setFilterConfig}
        todaysSales={todaysSales}
        salesPrediction={salesPrediction}
      />
    </div>
  );
};

export default InvHeader;

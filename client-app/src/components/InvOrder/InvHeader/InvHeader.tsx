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
    inTheBack: "",
    onTheFloor: "",
    order: "",
    sell: "",
    selling: "",
    suggested: "",
  }));

  console.log(productsNew);

  const [inputs, setProductInput] = useState(productsNew);

  console.log(inputs);

  const updateInputChanged = (id: any) => (e: any) => {
    let productsWithInput = [...inputs];
    let prodID = id;
    let property = e.target.name;
    const prodIndex = productsWithInput.findIndex(({ id }) => id === prodID);
    console.log(prodIndex);

    productsWithInput[prodIndex][property] = e.target.value;

    if (property === "onTheFloor" || property === "inTheBack") {
      let onTheFloorValue = Number(productsWithInput[prodIndex].onTheFloor);
      let intheBackValue = Number(productsWithInput[prodIndex].inTheBack);
      let sellingValue = Number(productsWithInput[prodIndex].selling);
      let sellValue = Number(productsWithInput[prodIndex].sell);
      let fillValue = Number(productsWithInput[prodIndex].fill);
      let parValue = Number(productsWithInput[prodIndex].par);

      let suggestedValue = Math.max(0,((((sellingValue - onTheFloorValue - intheBackValue) + sellValue) - fillValue) + parValue))

      productsWithInput[prodIndex].suggested = suggestedValue.toFixed(1)
    }
    setProductInput(productsWithInput);
    console.log(inputs);
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

  const [salesPrediction, setSalesPrediction] = useState(Number);

  console.log(salesPrediction)

  const setNewSalesPrediction = (newSalesNumber: number) => {
    setSalesPrediction(newSalesNumber)
    updateSell();
  };

  useEffect(() => {
    updateSell();
  }, [salesPrediction,setSalesPrediction]);

  const updateSell = () => {
    let productsWithSellSelling = [...inputs];

    const formatter = new Intl.NumberFormat("en-US",  {maximumFractionDigits: 1 })
      
    productsWithSellSelling.forEach((products) => { 
      products.sell = formatter.format((((salesPrediction * (products.percentSales/100))/products.retailPrice))/(products.caseSize)
    )});

    setProductInput(productsWithSellSelling);
  };

  
  const [todaysSales, setTodaysSales] = useState(Number);

  // The updateSelling and updateSell functions could maybe be refactored to be one function
  const setNewTodaysSales = (newToddaysSales: any) => {
    setTodaysSales(newToddaysSales);
    updateSelling();
  };

  useEffect(() => {
    updateSelling();
  }, [todaysSales,setTodaysSales]);

  const updateSelling = () => {
    let productsWithSellSelling = [...inputs];

    const formatter = new Intl.NumberFormat("en-US", {maximumFractionDigits: 1});
    
    productsWithSellSelling.forEach((products) => { 
      products.selling = formatter.format((((todaysSales * (products.percentSales/100))/products.retailPrice))/(products.caseSize)
      
    )});

    setProductInput(productsWithSellSelling);
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

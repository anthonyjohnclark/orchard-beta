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

  const calculateSuggestedValue = (onTheFloorValue: any,intheBackValue: any,sellingValue:any,sellValue: any,fillValue: any,parValue:any) => { 
    if (sellingValue){
    let neededValue = (sellValue + sellingValue)
    let onHand = (onTheFloorValue + intheBackValue)
    
      let suggestedValue = Math.max(0,(neededValue - onHand))

    return suggestedValue
  }
  return 0
    }

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

      productsWithInput[prodIndex].suggested = parseFloat(calculateSuggestedValue(onTheFloorValue,intheBackValue,sellingValue,sellValue,fillValue,parValue).toFixed(1))
    }
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

  const [salesPrediction, setSalesPrediction] = useState(Number);

  console.log(salesPrediction)

  const setNewSalesPrediction = (newSalesNumber: number, name:any) => {
    setSalesPrediction(newSalesNumber)
    updateSellSelling(name);
  };

  const updateSellSelling = (name:any) => {
    let productsWithSellSelling = [...inputs];
      productsWithSellSelling.forEach((products) => { 
      if (name ==="TodaysSales"){
        let sellValue = (((todaysSales * (products.percentSales/100))/products.retailPrice))/(products.caseSize)
        products.sell =  parseFloat(sellValue.toFixed(1))
      } else if (name ==="SalesPrediction"){
        let sellValue = (((salesPrediction * (products.percentSales/100))/products.retailPrice))/(products.caseSize)
        products.selling =  parseFloat(sellValue.toFixed(1))
      }         
});
        //this could also get refactored at some point. 
      productsWithSellSelling.forEach((products) => { 

      let onTheFloorValue = Number(products.onTheFloor);
      let intheBackValue = Number(products.inTheBack);
      let sellingValue = Number(products.selling);
      let sellValue = Number(products.sell);
      let fillValue = Number(products.fill);
      let parValue = Number(products.par);

       products.suggested = parseFloat(calculateSuggestedValue(onTheFloorValue,intheBackValue,sellingValue,sellValue,fillValue,parValue).toFixed(1))
      });
    setProductInput(productsWithSellSelling);
    return name;
  };
 
  const [todaysSales, setTodaysSales] = useState(Number);

  const setNewTodaysSales = (newToddaysSales: any, name:any) => {
    setTodaysSales(newToddaysSales);
    updateSellSelling(name);
  };

   useEffect(() => {
     updateSellSelling("TodaysSales");
     updateSellSelling("SalesPrediction");
   }, [salesPrediction,todaysSales]);

  // useEffect(() => {

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

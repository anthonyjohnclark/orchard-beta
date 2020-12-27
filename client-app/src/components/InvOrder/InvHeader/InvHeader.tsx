import React, { useState, useEffect, useCallback } from "react";
import InvProdList from "../InvProdList/InvProdList";
import classes from "../InvHeader/InvHeader.module.css";
import Countdown from "./InvHeaderComponents/Countdown";
import SearchBar from "./InvHeaderComponents/SearchBar";
import SalesPredictor from "./InvHeaderComponents/SalesPredictor";
import TodaysSales from "./InvHeaderComponents/TodaysSales";
import Auxil from "../../../hoc/Auxil";
import { IProductsWithInput } from "../../../models/Products";
import { IFilterConfig } from "../../../models/SortFilterConfig";
import axios from "axios";

interface IProps  {
  products: IProductsWithInput[];    
}

const InvHeader: React.FC<IProps> = ({products}) => {
  
  const [inputs, setProductInput] = useState<IProductsWithInput[]>(products);

  useEffect(() => {
    axios
    .get<IProductsWithInput[]>("http://localhost:5000/api/products")
    .then((response) => {
     //  console.log(response);
     let productsNew = response.data.map((prods) => ({
      ...prods,
      inTheBack: 0,
      onTheFloor: 0,
      order: 0,
      sell: 0,
      selling: 0,
      suggested: 0
    }))
    setProductInput(productsNew)
    });}, [])

  //here we need to create a new array with these additional blank fields for each product object
  // let productsNew = products.map((products) => ({
  //   ...products,
  //   inTheBack: 0,
  //   onTheFloor: 0,
  //   order: 0,
  //   sell: 0,
  //   selling: 0,
  //   suggested: 0
  // }));

  // console.log(productsNew)

  const calculateSuggestedValue = 
  ( onTheFloorValue: number,
    intheBackValue: number,
    sellingValue:number,
    sellValue: number,
    fillValue: number,
    parValue:number ) => { 
    if (sellingValue){
    let neededValue = (sellValue + sellingValue)
    let onHand = (onTheFloorValue + intheBackValue)
    
    let suggestedValue = Math.max(0,(neededValue - onHand))

    return suggestedValue
  }
  return 0
    }

  const updateInputChanged = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let productsWithInput = [...inputs];
    let prodID = id;
    const property = e.target.name;
    const prodIndex = productsWithInput.findIndex(({ id }) => id === prodID);
    // console.log(prodIndex);

    productsWithInput[prodIndex][property] = e.target.value;

    if (property === "onTheFloor" || property === "inTheBack") {
      let onTheFloorValue = Number(productsWithInput[prodIndex].onTheFloor);
      let intheBackValue = Number(productsWithInput[prodIndex].inTheBack);
      let sellingValue = Number(productsWithInput[prodIndex].selling);
      let sellValue = Number(productsWithInput[prodIndex].sell);
      let fillValue = Number(productsWithInput[prodIndex].fill);
      let parValue = Number(productsWithInput[prodIndex].par);

      productsWithInput[prodIndex].suggested= 
      parseFloat(calculateSuggestedValue(
        onTheFloorValue,
        intheBackValue,
        sellingValue,
        sellValue,
        fillValue,
        parValue).toFixed(1))
    }
    setProductInput(productsWithInput);
  };

  //update the initial state of inputs just once when it's blank to be a copy of the new array
      // useEffect(() => {
      //   if (productsNew !== []){
      //     setProductInput(productsNew);
      //   }
      //   setProductInput([])
      // }, [ setProductInput, productsNew ]);

  

  const [searchText, setSearch] = useState("");

  const setNewSearch = (newSearchText: string) => {
    setSearch(newSearchText);
  };

  const [salesPrediction, setSalesPrediction] = useState(Number);

  const setNewSalesPrediction = (newSalesNumber: number, name:string) => {
    setSalesPrediction(newSalesNumber)
    updateSellSelling(name);
  };

  const [todaysSales, setTodaysSales] = useState(Number);

  
  const setNewTodaysSales = (newToddaysSales: number, name:string) => {
    setTodaysSales(newToddaysSales);
    updateSellSelling(name);
  };

// had to use React setState callback
  const updateSellSelling = useCallback((name:string) => {
    setProductInput(inputs => {
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

       products.suggested = 
       parseFloat(calculateSuggestedValue(
         onTheFloorValue,
         intheBackValue,
         sellingValue,
         sellValue,
         fillValue,
         parValue).toFixed(1))
      });
    return productsWithSellSelling;})
  }, [salesPrediction,todaysSales]);
 

  const setOrderToSuggested = (roundingDirection:boolean, e:React.MouseEvent<HTMLDivElement, MouseEvent>) => { 
    let productsWithOrderSetToSuggested = [...inputs];
  
    const element = e.target as HTMLInputElement

    if (element.id === 'revert'){
      productsWithOrderSetToSuggested.forEach((products) => {
        products.order = 0
      })
    }

    if (element.id ==='set')
    productsWithOrderSetToSuggested.forEach((products) => {
      if (roundingDirection){
      products.order = Math.floor(products.suggested)
      }
      else if(!roundingDirection) {
        products.order = Math.ceil(products.suggested)
      };
    })

    setProductInput(productsWithOrderSetToSuggested);
  }

   useEffect(() => {
     updateSellSelling("TodaysSales");
     updateSellSelling("SalesPrediction");
   }, [salesPrediction,todaysSales, updateSellSelling ]);

  const [filterConfig, setFilterConfig] = useState<IFilterConfig>({id:0, primaryKey:"", secondaryKey:""});

  const requestFilterConfig = (id: number, primaryKey: string, secondaryKey: string) => {
    setFilterConfig({ id, primaryKey, secondaryKey });
  };

  let searchfilteredProducts = inputs.filter((products) => {
    return (
      products.name.toString().toLowerCase().indexOf(searchText) >= 0 ||
      products.id.toString().indexOf(searchText) >= 0
    );
  });

  let filteredProducts = [...searchfilteredProducts].filter((products) => {
    if (filterConfig !== null) {
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
      <Auxil>
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
        <SearchBar setNewSearch={setNewSearch} />
      </div>
      <div className = {classes.InvProdWrapper}>
      <InvProdList
        updateInputChanged={updateInputChanged}
        products={filteredProducts}
        requestFilterConfig={requestFilterConfig}
        filterConfig={filterConfig}
        setFilterConfig={setFilterConfig}
        todaysSales={todaysSales}
        salesPrediction={salesPrediction}
        setOrderToSuggested = {setOrderToSuggested}
        productsWithInputs = {inputs}
      />
      </div>
      </Auxil>
  );
};

export default InvHeader;

import React, { useState, useEffect } from "react";
import Auxil from "../../hoc/Auxil";
import InvHeader from "../../components/InvOrder/InvHeader/InvHeader";
import InvProdList from "../../components/InvOrder/InvProdList/InvProdList";
import InvOrderSummary from "../../components/InvOrder/InvOrderSummary/InvOrderSummary";
import useSaveTotalPieces from "../../hooks/useSaveTotalPieces";
import useGetBaseProducts from "../../hooks/useGetBaseProducts";
import ProductManipulator  from "../../functions/ProductManipulator";
import UseRequestSortFilter from "../../hooks/useRequestSortFilter";


const InvOrder = () => {
  

  // const [inputs, setProductInput] = useState<IProductsWithInput[]>([]);

  // useEffect(() => {
  //   axios
  //   .get<IProductsWithInput[]>("http://localhost:5000/api/products")
  //   .then((response) => {
  //    //  console.log(response);
  //    let productsNew = response.data.map((prods) => ({
  //     ...prods,
  //     inTheBack: 0,
  //     onTheFloor: 0,
  //     order: 0,
  //     sell: 0,
  //     selling: 0,
  //     suggested: 0
  //   }))
  //   setProductInput(productsNew)
  //   });}, [])


  // const calculateSuggestedValue = 
  // ( onTheFloorValue: number,
  //   intheBackValue: number,
  //   sellingValue:number,
  //   sellValue: number,
  //   fillValue: number,
  //   parValue:number ) => { 
  //   if (sellingValue){
  //   let neededValue = (sellValue + sellingValue)
  //   let onHand = (onTheFloorValue + intheBackValue)
    
  //   let suggestedValue = Math.max(0,(neededValue - onHand))

  //   return suggestedValue
  // }
  // return 0
  //   }

  // const updateInputChanged = UpdateInputsChanged(i)

  // const updateInputChanged = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let productsWithInput = [...baseProducts];
  //   let prodID = id;
  //   const property = e.target.name;
  //   const prodIndex = productsWithInput.findIndex(({ id }) => id === prodID);
  //   // console.log(prodIndex);

  //   productsWithInput[prodIndex][property] = e.target.value;

  //   if (property === "onTheFloor" || property === "inTheBack") {
  //     let onTheFloorValue = Number(productsWithInput[prodIndex].onTheFloor);
  //     let intheBackValue = Number(productsWithInput[prodIndex].inTheBack);
  //     let sellingValue = Number(productsWithInput[prodIndex].selling);
  //     let sellValue = Number(productsWithInput[prodIndex].sell);
  //     let fillValue = Number(productsWithInput[prodIndex].fill);
  //     let parValue = Number(productsWithInput[prodIndex].par);

  //     productsWithInput[prodIndex].suggested= 
  //     parseFloat(CalculateSuggestedValue(
  //       onTheFloorValue,
  //       intheBackValue,
  //       sellingValue,
  //       sellValue,
  //       fillValue,
  //       parValue).toFixed(1))
  //   }
  //   setProductInput(productsWithInput);
  // };

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

  const [ baseProducts, updateInputChanged, updateSellSelling, setOrderToSuggested ] = useGetBaseProducts(todaysSales,salesPrediction)


// // had to use React setState callback
//   const updateSellSelling = useCallback((name:string) => {
//     setProductInput(inputs => {
//     let productsWithSellSelling = [...inputs];
//       productsWithSellSelling.forEach((products) => { 
//       if (name ==="TodaysSales"){
//         let sellValue = (((todaysSales * (products.percentSales/100))/products.retailPrice))/(products.caseSize)
//         products.sell =  parseFloat(sellValue.toFixed(1))
//       } else if (name ==="SalesPrediction"){
//         let sellValue = (((salesPrediction * (products.percentSales/100))/products.retailPrice))/(products.caseSize)
//         products.selling =  parseFloat(sellValue.toFixed(1))
//       }         
// });
//         //this could also get refactored at some point. 
//       productsWithSellSelling.forEach((products) => { 

//       let onTheFloorValue = Number(products.onTheFloor);
//       let intheBackValue = Number(products.inTheBack);
//       let sellingValue = Number(products.selling);
//       let sellValue = Number(products.sell);
//       let fillValue = Number(products.fill);
//       let parValue = Number(products.par);

//        products.suggested = 
//        parseFloat(CalculateSuggestedValue(
//          onTheFloorValue,
//          intheBackValue,
//          sellingValue,
//          sellValue,
//          fillValue,
//          parValue).toFixed(1))
//       });
//     return productsWithSellSelling;})
//   }, [salesPrediction,todaysSales]);
 

  // const setOrderToSuggested = (
  //   roundingDirection:boolean, 
  //   e:React.MouseEvent<HTMLDivElement, 
  //   MouseEvent>) => { 

  //   let productsWithOrderSetToSuggested = [...baseProducts];
  
  //   const element = e.target as HTMLInputElement

  //   if (element.id === 'revert'){
  //     productsWithOrderSetToSuggested.forEach((products) => {
  //       products.order = 0
  //     })
  //   }

  //   if (element.id ==='set')
  //   productsWithOrderSetToSuggested.forEach((products) => {
  //     if (roundingDirection){
  //     products.order = Math.floor(products.suggested)
  //     }
  //     else if(!roundingDirection) {
  //       products.order = Math.ceil(products.suggested)
  //     };
  //   })
  //   setProductInput(productsWithOrderSetToSuggested);
  // }

  //  useEffect(() => {
  //    updateSellSelling("TodaysSales");
  //    updateSellSelling("SalesPrediction");
  //  }, [ salesPrediction, todaysSales, updateSellSelling ]);

  // const [filterConfig, setFilterConfig] = useState<IFilterConfig>({id:0, primaryKey:"", secondaryKey:""});

  // const requestFilterConfig = (id: number, primaryKey: string, secondaryKey: string) => {
  //   setFilterConfig({ id, primaryKey, secondaryKey });
  // };

  let searchFilteredProducts = ProductManipulator.SearchFilteredProducts([...baseProducts], searchText)

  // let searchfilteredProducts = [...baseProducts].filter((products) => {
  //   return (
  //     products.name.toString().toLowerCase().indexOf(searchText) >= 0 ||
  //     products.id.toString().indexOf(searchText) >= 0
  //   );
  // });

  const [sortConfig, 
    filterConfig, 
    sortConfigForHeaders, 
    activeSort,
    filterEnabled,
    requestSortForHeaders,
    setFilterEnabled,
    requestSort,
    setButtonActive,
    activeHeaderSort,
    setHeaderActive] = UseRequestSortFilter()

  let filteredProducts = ProductManipulator.FilterProducts([...searchFilteredProducts], filterConfig)
    
  // [...searchfilteredProducts].filter((products) => {
  //   if (filterConfig !== null) {
  //     switch (filterConfig.id) {
  //       case 1:
  //         return products[filterConfig.primaryKey];
  //       case 2:
  //       case 4:
  //       case 5:
  //         return (
  //           products[filterConfig.primaryKey] &&
  //           products[filterConfig.secondaryKey]
  //         );
  //       case 3:
  //         return (
  //           products[filterConfig.primaryKey] &&
  //           !products[filterConfig.secondaryKey]
  //         );
  //       case 6:
  //       case 7:
  //       case 9:
  //         return (
  //           !products[filterConfig.primaryKey] &&
  //           products[filterConfig.secondaryKey]
  //         );
  //       case 8:
  //         return (
  //           !products[filterConfig.primaryKey] &&
  //           !products[filterConfig.secondaryKey]
  //         );
  //       case 10:
  //         return !products[filterConfig.primaryKey];
  //     }
  //   }
  //   return [...searchfilteredProducts];
  // });

  //InvProdList

  
 const [dropdown, toggleDropdown] = useState(false);

  // const [sortConfig, setSortConfig] = useState<ISortConfig>({
  //   id: 0,
  //   primaryKey: "",
  //   secondaryKey: "",
  //   tertiaryKey: "",
  //   direction: "",
  // });

  // const [sortConfigForHeaders, setSortConfigForHeaders] = useState<ISortConfigForHeaders>({
  //   key: "",
  //   direction: ""
  // });


  // const [activeSort, toggleActiveSort] = useState({ buttonKey: 0 });
  // const setButtonActive = (buttonKey: number) => {
  //   toggleActiveSort({ buttonKey });
  // };
  
  // const [activeHeaderSort, toggleHeaderActiveSort] = useState({ headerKey: 0 });
  // const setHeaderActive = (headerKey: number) => {
  //   toggleHeaderActiveSort({ headerKey });
  // };

  // const [dropdown, toggleDropdown] = useState(false);

  // const [filterEnabled, toggleFilter] = useState(false);

  // // console.log(sortConfig)
  // // console.log(sortConfigForHeaders)
  // // console.log(filterConfig)
  // // console.log(filterEnabled)

  // const requestSort = (
  //   id: number,
  //   primaryKey: string,
  //   secondaryKey: string,
  //   tertiaryKey: string,
  //   direction: string
  // ) => {
  //   setSortConfig({
  //     id,
  //     primaryKey,
  //     secondaryKey,
  //     tertiaryKey,
  //     direction,
  //   });
  //   toggleHeaderActiveSort({ headerKey: 0 });

  //   if (!filterEnabled && sortConfig.id === id) {
  //     toggleActiveSort({ buttonKey: 0 });
  //     setSortConfig({
  //       id: 0,
  //       primaryKey: "",
  //       secondaryKey: "",
  //       tertiaryKey: "",
  //       direction: "",
  //     });
  //   }

  //   if (!filterEnabled) {
  //     requestFilterConfig(
  //       //only primary and secondary key are passed for the filter
  //       0,
  //       primaryKey,
  //       secondaryKey
  //     );
  //   }

  //   if (filterEnabled) {
  //     requestFilterConfig(
  //       //only primary and secondary key are passed for the filter
  //       id,
  //       primaryKey,
  //       secondaryKey
  //     );
  //   }

  //   if (filterEnabled && filterConfig.id === id) {
  //       requestFilterConfig(
  //       //only primary and secondary key are passed for the filter
  //       0,
  //       primaryKey,
  //       secondaryKey
  //     );

  //     setSortConfig({
  //       id: 0,
  //       primaryKey: "",
  //       secondaryKey: "",
  //       tertiaryKey: "",
  //       direction: "",
  //     });
  //     toggleActiveSort({ buttonKey: 0 });
  //   }
  // };


  // const setFilterEnabled = (filterEnabled: boolean, 
  //   e:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
  //   toggleFilter(!filterEnabled);
  //   e.stopPropagation();

  //   if (sortConfig) {
  //       requestFilterConfig(
  //       //only primary and secondary key are passed for the filter
  //       sortConfig.id,
  //       sortConfig.primaryKey,
  //       sortConfig.secondaryKey
  //     );
  //   }
  //   //'resets' the config id to 0 so that filtering stops if you have a sortConfig
  //   if (sortConfig.id === filterConfig.id) {
  //       requestFilterConfig(
  //       //only primary and secondary key are passed for the filter
  //       0,
  //       sortConfig.primaryKey,
  //       sortConfig.secondaryKey
  //     );
  //   }
  //   if (filterEnabled && filterConfig.id === 0) {
  //       setFilterConfig({
  //       id: 0,
  //       primaryKey: "",
  //       secondaryKey: "",
  //     });
  //       setSortConfig({
  //       id: 0,
  //       primaryKey: "",
  //       secondaryKey: "",
  //       tertiaryKey: "",
  //       direction: "",
  //     });
  //   }
  //   if (!!filterEnabled && sortConfigForHeaders.key !== "" && sortConfig.primaryKey === ""){
  //       toggleActiveSort({ buttonKey:0 });
  //    }
  // };

  // // console.log(filterEnabled);

  // //the key here needs to be the column name which is of type string

  // const requestSortForHeaders = (key: string) => {
  //   let direction = "ascending";
  //   if (
  //     sortConfigForHeaders.key === key &&
  //     sortConfigForHeaders.direction === "ascending"
  //   ) {
  //     direction = "descending";
  //     console.log("requestSort for headers")
  //   }
    
  //   if (sortConfig.primaryKey !== "") {
  //     setSortConfig({
  //       id: 0,
  //       primaryKey: "",
  //       secondaryKey: "",
  //       tertiaryKey: "",
  //       direction: "",
  //     });
  //   }
  //    setSortConfigForHeaders({ key, direction });
  //   if (!filterEnabled) toggleActiveSort({ buttonKey: 0 });
  // };

  let sortedProducts = ProductManipulator.SortProducts([...filteredProducts], sortConfig,sortConfigForHeaders)
  
  // console.log(sortConfig)
  
  // if (sortConfigForHeaders !== null) {
  //   sortedProducts.sort((a, b) => {
  //     if (a[sortConfigForHeaders.key] < b[sortConfigForHeaders.key]) {
  //       return sortConfigForHeaders.direction === "ascending" ? -1 : 1;
  //     }
  //     if (a[sortConfigForHeaders.key] > b[sortConfigForHeaders.key]) {
  //       return sortConfigForHeaders.direction === "ascending" ? 1 : -1;
  //     }
  //     return 0;
  //   });
  // }
  // if (sortConfig !== null) {
  //   if (sortConfig.direction === "normal") {
  //     sortedProducts.sort((a:any, b:any) => {
  //       return (
  //         b[sortConfig.primaryKey] - a[sortConfig.primaryKey] ||
  //         b[sortConfig.secondaryKey] - a[sortConfig.secondaryKey] ||
  //         b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
  //       );
  //     });
  //   } else if (sortConfig.direction === "reverse1") {
  //     sortedProducts.sort((a:any, b:any) => {
  //       return (
  //         a[sortConfig.primaryKey] - b[sortConfig.primaryKey] ||
  //         b[sortConfig.secondaryKey] - a[sortConfig.secondaryKey] ||
  //         b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
  //       );
  //     });
  //   } else if (sortConfig.direction === "reverse2") {
  //     sortedProducts.sort((a:any, b:any) => {
  //       return (
  //         b[sortConfig.primaryKey] - a[sortConfig.primaryKey] ||
  //         a[sortConfig.secondaryKey] - b[sortConfig.secondaryKey] ||
  //         b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
  //       );
  //     });
  //   } else if (sortConfig.direction === "reverse1and2") {
  //     sortedProducts.sort((a:any, b:any) => {
  //       return (
  //         a[sortConfig.primaryKey] - b[sortConfig.primaryKey] ||
  //         a[sortConfig.secondaryKey] - b[sortConfig.secondaryKey] ||
  //         b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
  //       );
  //     });
  //   }}
  
  
 
    let orderedProducts = ProductManipulator.CreateOrderedProducts([...baseProducts])
    //   {
//   productVIN: products.id,
//   productName: products.name,
//   ordered:  products.order,
//   totalCost: products.order * products.cost
// }));

//   console.log(orderedProducts)

//can maybe these next two functions get refactored to one function that returns both?

// const totalPieces = useSaveTotalPieces(orderedProducts);
 const totalPieces = useSaveTotalPieces(orderedProducts);

//  const saveTotalPieces = () => {
//  let initialValue = 0
//  let sum = orderedProducts.reduce(
//    (accumulator:any, currentValue:any) => accumulator + parseInt(currentValue.ordered)
//    , initialValue
//  )
//  setTotalPieces(sum);
//  }

const [totalCost, setTotalCost] = useState("0")

const saveTotalCost = () => {
  let initialValue = 0
  let sum = orderedProducts.reduce(
      (accumulator:any, currentValue:any) => accumulator + currentValue.totalCost
      , initialValue
  )
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

     let formattedSum = formatter.format(sum)

  setTotalCost(formattedSum);
  }
  
useEffect(() => {
  saveTotalCost();
  // saveTotalPieces();
});

    return (
      <Auxil>
        <InvHeader
        todaysSales={todaysSales}
        salesPrediction={salesPrediction}
        setNewTodaysSales = {setNewTodaysSales}
        setNewSalesPrediction = {setNewSalesPrediction}
        setNewSearch = {setNewSearch}
        />
        <InvProdList
          filterEnabled={filterEnabled}
          setFilterEnabled={setFilterEnabled}
          dropdown={dropdown}
          toggleDropdown={toggleDropdown}
          activeSort={activeSort}
          requestSort={requestSort}
          setButtonActive={setButtonActive}
          activeHeaderSort={activeHeaderSort}
          setHeaderActive={setHeaderActive}
          requestSortForHeaders={requestSortForHeaders}
          sortConfigForHeaders={sortConfigForHeaders}  
          updateInputChanged={updateInputChanged}
          sortedAndFilteredProducts={sortedProducts}
          // salesPrediction={salesPrediction}
          // todaysSales={todaysSales}
          />
        <InvOrderSummary 
          todaysSales={todaysSales}
          salesPrediction={salesPrediction}
          orderedProducts = {orderedProducts}
          setOrderToSuggested = {setOrderToSuggested}
          totalCost = {totalCost}
          //  saveTotalPieces = {saveTotalPieces}
          saveTotalCost = {saveTotalCost}
          totalPieces = {totalPieces}
        />
      </Auxil>
    );
}

export default InvOrder;

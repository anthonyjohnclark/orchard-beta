import React, { useState } from "react";
import Auxil from "../../hoc/Auxil";
import InvHeader from "../../components/InvOrder/InvHeader/InvHeader";
import InvProdList from "../../components/InvOrder/InvProdList/InvProdList";
import InvOrderSummary from "../../components/InvOrder/InvOrderSummary/InvOrderSummary";
import useSaveTotalPieces from "./../../hooks/InvOrdHooks/useSaveTotalPieces";
import useSaveTotalCost from "./../../hooks/InvOrdHooks/useSaveTotalCost";
import useGetBaseProducts from "./../../hooks/InvOrdHooks/useGetBaseProducts";
import ProductManipulator  from "./../../functions/ProductManipulator";
import useRequestSortFilter from "./../../hooks/InvOrdHooks/useRequestSortFilter";
import useIsOrderable from "./../../hooks/InvOrdHooks/useIsOrderable";
import CreatePostOrderObject  from "./../../functions/CreatePostOrderObject";

const InvOrder = () => {

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

  let searchFilteredProducts = ProductManipulator.SearchFilteredProducts([...baseProducts], searchText)
  
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
    setHeaderActive] = useRequestSortFilter()

  let filteredProducts = ProductManipulator.FilterProducts([...searchFilteredProducts], filterConfig)
  
  const [dropdown, toggleDropdown] = useState(false);

  let sortedProducts = ProductManipulator.SortProducts([...filteredProducts], sortConfig,sortConfigForHeaders)
  
  let orderedProducts = ProductManipulator.CreateOrderedProducts([...baseProducts])

  const totalPieces = useSaveTotalPieces(orderedProducts);

  const totalCost = useSaveTotalCost(orderedProducts);

  let orderSubmitObject = CreatePostOrderObject(totalPieces,totalCost, [...orderedProducts])

  const [orderable, toggleIsOrderable] = useIsOrderable();

    return (
      <Auxil>
        <InvHeader
        todaysSales={todaysSales}
        salesPrediction={salesPrediction}
        setNewTodaysSales = {setNewTodaysSales}
        setNewSalesPrediction = {setNewSalesPrediction}
        setNewSearch = {setNewSearch}
        toggleIsOrderable = {toggleIsOrderable}
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
          orderSubmitObject = {orderSubmitObject}
          // saveTotalPieces = {saveTotalPieces}
          // saveTotalCost = {saveTotalCost}
          totalPieces = {totalPieces}
          orderable = {orderable}
        />
      </Auxil>
    );
}

export default InvOrder;

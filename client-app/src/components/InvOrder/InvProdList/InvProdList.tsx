import React, { useState } from "react";
import classes from "../InvProdList/InvProdList.module.css";
import InvProduct from "./InvProd/InvProduct";
import Auxil from "../../../hoc/Auxil";
import ButtonList from "./InvProdListComponents/ButtonList";
import TableHeaders from "./InvProdListComponents/TableHeaders";
import SortFilterButton from "./InvProdListComponents/SortFilterButton";
import InvOrderSummary from "../InvOrderSummary/InvOrderSummary";
import { IProductsWithInput } from "../../../models/Products"
import { ISortConfig, ISortConfigForHeaders } from "../../../models/SortFilterConfig"
import { IFilterConfig } from "../../../models/SortFilterConfig"

interface IProps  {
  products: IProductsWithInput[];
  requestFilterConfig: ( id: number, primaryKey: string, secondaryKey: string) => void
  updateInputChanged: (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => void
  setOrderToSuggested: (roundingDirection: boolean, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  setFilterConfig: (value: React.SetStateAction<IFilterConfig>) => void
  filterConfig: IFilterConfig;
  todaysSales: number;
  salesPrediction: number;
}

const InvProdList: React.FC<IProps> = ({
  products, 
  requestFilterConfig, 
  filterConfig, 
  updateInputChanged,
  setFilterConfig,
  setOrderToSuggested,
  todaysSales,
  salesPrediction
 }) => {

  const [activeSort, toggleActiveSort] = useState({ buttonKey: 0 });
  const setButtonActive = (buttonKey: number) => {
    toggleActiveSort({ buttonKey });
  };
  
  const [activeHeaderSort, toggleHeaderActiveSort] = useState({ headerKey: 0 });
  const setHeaderActive = (headerKey: number) => {
    toggleHeaderActiveSort({ headerKey });
  };

  const [dropdown, toggleDropdown] = useState(false);

  const [filterEnabled, toggleFilter] = useState(false);

  const requestSort = (
    id: number,
    primaryKey: string,
    secondaryKey: string,
    tertiaryKey: string,
    direction: string
  ) => {
    setSortConfig({
      id,
      primaryKey,
      secondaryKey,
      tertiaryKey,
      direction,
    });
    toggleHeaderActiveSort({ headerKey: 0 });

    if (!filterEnabled && sortConfig.id === id) {
      toggleActiveSort({ buttonKey: 0 });
      setSortConfig({
        id: 0,
        primaryKey: "",
        secondaryKey: "",
        tertiaryKey: "",
        direction: "",
      });
    }

    if (!filterEnabled) {
      requestFilterConfig(
        //only primary and secondary key are passed for the filter
        0,
        primaryKey,
        secondaryKey
      );
    }
    if (filterEnabled) {
      requestFilterConfig(
        //only primary and secondary key are passed for the filter
        id,
        primaryKey,
        secondaryKey
      );
    }

    if (filterEnabled && filterConfig.id === id) {
        requestFilterConfig(
        //only primary and secondary key are passed for the filter
        0,
        primaryKey,
        secondaryKey
      );

      setSortConfig({
        id: 0,
        primaryKey: "",
        secondaryKey: "",
        tertiaryKey: "",
        direction: "",
      });
      toggleActiveSort({ buttonKey: 0 });
    }
  };

  const setFilterEnabled = (filterEnabled: boolean, e:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    toggleFilter(!filterEnabled);
    e.stopPropagation();

    if (sortConfig) {
        requestFilterConfig(
        //only primary and secondary key are passed for the filter
        sortConfig.id,
        sortConfig.primaryKey,
        sortConfig.secondaryKey
      );
    }
    //'resets' the config id to 0 so that filtering stops if you have a sortConfig
    if (sortConfig.id === filterConfig.id) {
        requestFilterConfig(
        //only primary and secondary key are passed for the filter
        0,
        sortConfig.primaryKey,
        sortConfig.secondaryKey
      );
    }
    if (filterEnabled && filterConfig.id === 0) {
        setFilterConfig({
        id: 0,
        primaryKey: "",
        secondaryKey: "",
      });
        setSortConfig({
        id: 0,
        primaryKey: "",
        secondaryKey: "",
        tertiaryKey: "",
        direction: "",
      });
    }
  };

  // console.log(filterEnabled);

  const [sortConfig, setSortConfig] = useState<ISortConfig>({
    id: 0,
    primaryKey: "",
    secondaryKey: "",
    tertiaryKey: "",
    direction: "",
  });

  const [sortConfigForHeaders, setSortConfigForHeaders] = useState<ISortConfigForHeaders>({
    key: "",
    direction: ""
  });

  let sortedProducts = [...products];

  //the key here needs to be the column name which is of type string

  const requestSortForHeaders = (key: string) => {
    let direction = "ascending";
    if (
      sortConfigForHeaders.key === key &&
      sortConfigForHeaders.direction === "ascending"
    ) {
      direction = "descending";
    }
    
    if (sortConfig !== null) {
      setSortConfig({
        id: 0,
        primaryKey: "",
        secondaryKey: "",
        tertiaryKey: "",
        direction: "",
      });
    }
     setSortConfigForHeaders({ key, direction });
    if (!filterEnabled) toggleActiveSort({ buttonKey: 0 });
  };


  if (sortConfigForHeaders !== null) {
    sortedProducts.sort((a, b) => {
      if (a[sortConfigForHeaders.key] < b[sortConfigForHeaders.key]) {
        return sortConfigForHeaders.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfigForHeaders.key] > b[sortConfigForHeaders.key]) {
        return sortConfigForHeaders.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }
  if (sortConfig !== null) {
    if (sortConfig.direction === "normal") {
      sortedProducts.sort((a:any, b:any) => {
        return (
          b[sortConfig.primaryKey] - a[sortConfig.primaryKey] ||
          b[sortConfig.secondaryKey] - a[sortConfig.secondaryKey] ||
          b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
        );
      });
    } else if (sortConfig.direction === "reverse1") {
      sortedProducts.sort((a:any, b:any) => {
        return (
          a[sortConfig.primaryKey] - b[sortConfig.primaryKey] ||
          b[sortConfig.secondaryKey] - a[sortConfig.secondaryKey] ||
          b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
        );
      });
    } else if (sortConfig.direction === "reverse2") {
      sortedProducts.sort((a:any, b:any) => {
        return (
          b[sortConfig.primaryKey] - a[sortConfig.primaryKey] ||
          a[sortConfig.secondaryKey] - b[sortConfig.secondaryKey] ||
          b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
        );
      });
    } else if (sortConfig.direction === "reverse1and2") {
      sortedProducts.sort((a:any, b:any) => {
        return (
          a[sortConfig.primaryKey] - b[sortConfig.primaryKey] ||
          a[sortConfig.secondaryKey] - b[sortConfig.secondaryKey] ||
          b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
        );
      });
    }
  }

  return (
    <Auxil>
      <div className={classes.SortContainer}>
        <SortFilterButton
          filterEnabled={filterEnabled}
          setFilterEnabled={setFilterEnabled}
          dropdown={dropdown}
          toggleDropdown={toggleDropdown}
          activeSort={activeSort}
        />
        {dropdown ? (
          <div className={classes.SortDropdown}>
            <ButtonList
              requestSort={requestSort}
              setButtonActive={setButtonActive}
              activeSort={activeSort}
            />
          </div>
        ) : null}
      </div>
      <table className={classes.InvProdTable}>
        <thead className={classes.InvProdHeader}>
          <TableHeaders
            activeHeaderSort={activeHeaderSort}
            setHeaderActive={setHeaderActive}
            requestSortForHeaders={requestSortForHeaders}
            sortConfigForHeaders={sortConfigForHeaders}
          />
        </thead>
        <InvProduct
          //  key={props.id}
          updateInputChanged={updateInputChanged}
          sortedAndFilteredProducts={sortedProducts}
          // salesPrediction={salesPrediction}
          // todaysSales={todaysSales}
          // renderProductRows={renderProductRows}
        />
      </table>
      <InvOrderSummary
      todaysSales={todaysSales}
      salesPrediction={salesPrediction}
      products = {products}
      setOrderToSuggested = {setOrderToSuggested}
      ></InvOrderSummary>
    </Auxil>
  );
};
export default InvProdList;

/* <th scope="col">Trending</th>
<th scope="col">GIG</th>
/* <th scope="col">Sold Yesterday</th>


<th scope="col">Shrink</th> */

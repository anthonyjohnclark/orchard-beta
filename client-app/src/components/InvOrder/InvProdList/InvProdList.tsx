import React, { useState } from "react";
import classes from "../InvProdList/InvProdList.module.css";
import InvProduct from "./InvProd/InvProduct";
import Auxil from "../../../hoc/Auxil";
import ButtonList from "./InvProdComponents/ButtonList";
import TableHeaders from "./InvProdComponents/TableHeaders";
import SortFilterButton from "./InvProdComponents/SortFilterButton";

const InvProdList = (props: any) => {
  const { products } = props;

  const [activeSort, toggleActiveSort] = useState({ buttonKey: 0 });
  const setButtonActive = (buttonKey: any) => {
    toggleActiveSort({ buttonKey });
  };

  const [activeHeaderSort, toggleHeaderActiveSort] = useState({ headerKey: 0 });
  const setHeaderActive = (headerKey: any) => {
    toggleHeaderActiveSort({ headerKey });
  };

  const [dropdown, toggleDropdown] = useState(false);

  const [filterEnabled, toggleFilter] = useState(false);

  const requestSort = (
    id: any,
    primaryKey: any,
    secondaryKey: any,
    tertiaryKey: any,
    direction: any
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
        primaryKey: 0,
        secondaryKey: 0,
        tertiaryKey: 0,
        direction: 0,
      });
    }

    if (!filterEnabled) {
      props.requestFilterConfig(
        //only primary and secondary key are passed for the filter
        0,
        primaryKey,
        secondaryKey
      );
    }
    if (filterEnabled) {
      props.requestFilterConfig(
        //only primary and secondary key are passed for the filter
        id,
        primaryKey,
        secondaryKey
      );
    }

    if (filterEnabled && props.filterConfig.id === id) {
      props.requestFilterConfig(
        //only primary and secondary key are passed for the filter
        0,
        primaryKey,
        secondaryKey
      );

      setSortConfig({
        id: 0,
        primaryKey: 0,
        secondaryKey: 0,
        tertiaryKey: 0,
        direction: 0,
      });
      toggleActiveSort({ buttonKey: 0 });
    }
  };

  const setFilterEnabled = (filterEnabled: any, e: any) => {
    toggleFilter(!filterEnabled);
    e.stopPropagation();

    if (sortConfig) {
      props.requestFilterConfig(
        //only primary and secondary key are passed for the filter
        sortConfig.id,
        sortConfig.primaryKey,
        sortConfig.secondaryKey
      );
    }
    //'resets' the config id to 0 so that filtering stops if you have a sortConfig
    if (sortConfig.id === props.filterConfig.id) {
      props.requestFilterConfig(
        //only primary and secondary key are passed for the filter
        0,
        sortConfig.primaryKey,
        sortConfig.secondaryKey
      );
    }
    if (filterEnabled && props.filterConfig.id === 0) {
      props.setFilterConfig({
        id: 0,
        primaryKey: 0,
        secondaryKey: 0,
      });
      setSortConfig({
        id: 0,
        primaryKey: 0,
        secondaryKey: 0,
        tertiaryKey: 0,
        direction: 0,
      });
    }
  };

  console.log(filterEnabled);

  const [sortConfig, setSortConfig] = useState(props);
  const [sortConfigForHeaders, setSortConfigForHeaders] = useState(props);

  let sortedProducts = [...products];

  console.log(sortConfig);

  const requestSortForHeaders = (key: any) => {
    let direction = "ascending";
    if (
      sortConfigForHeaders.key === key &&
      sortConfigForHeaders.direction === "ascending"
    ) {
      direction = "descending";
    }
    if (sortConfig !== null) {
      setSortConfig(products);
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
      sortedProducts.sort((a, b) => {
        return (
          b[sortConfig.primaryKey] - a[sortConfig.primaryKey] ||
          b[sortConfig.secondaryKey] - a[sortConfig.secondaryKey] ||
          b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
        );
      });
    } else if (sortConfig.direction === "reverse1") {
      sortedProducts.sort((a, b) => {
        return (
          a[sortConfig.primaryKey] - b[sortConfig.primaryKey] ||
          b[sortConfig.secondaryKey] - a[sortConfig.secondaryKey] ||
          b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
        );
      });
    } else if (sortConfig.direction === "reverse2") {
      sortedProducts.sort((a, b) => {
        return (
          b[sortConfig.primaryKey] - a[sortConfig.primaryKey] ||
          a[sortConfig.secondaryKey] - b[sortConfig.secondaryKey] ||
          b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
        );
      });
    } else if (sortConfig.direction === "reverse1and2") {
      sortedProducts.sort((a, b) => {
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
          key={props.id}
          products={props.products}
          sortedProducts={sortedProducts}
        />
      </table>
    </Auxil>
  );
};
export default InvProdList;

/* <th scope="col">Trending</th>
<th scope="col">GIG</th>
/* <th scope="col">Sold Yesterday</th>


<th scope="col">Shrink</th> */

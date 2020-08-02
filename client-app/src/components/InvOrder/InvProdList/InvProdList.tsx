import React, { useState } from "react";
import classes from "../InvProdList/InvProdList.module.css";
import InvProduct from "./InvProd/InvProduct";
import Auxil from "../../../hoc/Auxil";
import ButtonList from "./InvProdComponents/ButtonList";
import TableHeaders from "./InvProdComponents/TableHeaders";

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

  const [sortConfig, setSortConfig] = useState(props);
  const [sortConfigForHeaders, setSortConfigForHeaders] = useState(props);

  let sortedProducts = [...products];

  const requestSort = (
    primaryKey: any,
    secondaryKey: any,
    tertiaryKey: any,
    direction: any
  ) => {
    toggleHeaderActiveSort({ headerKey: 0 });
    setSortConfig({ primaryKey, secondaryKey, tertiaryKey, direction });
  };

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
    toggleActiveSort({ buttonKey: 0 });
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
    if (sortConfig.direction == "normal") {
      sortedProducts.sort((a, b) => {
        return (
          b[sortConfig.primaryKey] - a[sortConfig.primaryKey] ||
          b[sortConfig.secondaryKey] - a[sortConfig.secondaryKey] ||
          b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
        );
      });
    } else if (sortConfig.direction == "reverse1") {
      sortedProducts.sort((a, b) => {
        return (
          a[sortConfig.primaryKey] - b[sortConfig.primaryKey] ||
          b[sortConfig.secondaryKey] - a[sortConfig.secondaryKey] ||
          b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
        );
      });
    } else if (sortConfig.direction == "reverse2") {
      sortedProducts.sort((a, b) => {
        return (
          b[sortConfig.primaryKey] - a[sortConfig.primaryKey] ||
          a[sortConfig.secondaryKey] - b[sortConfig.secondaryKey] ||
          b[sortConfig.tertiaryKey] - a[sortConfig.tertiaryKey]
        );
      });
    } else if (sortConfig.direction == "reverse1and2") {
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
        <button
          className={dropdown === false ? classes.SortButton : classes.Active}
          onClick={() => toggleDropdown(!dropdown)}
        >
          ☰ Sort
        </button>
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

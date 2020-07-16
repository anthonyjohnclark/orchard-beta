import React, { useState } from "react";
import classes from "../InvProdList/InvProdList.module.css";
import InvProduct from "./InvProd/InvProduct";
import Auxil from "../../../hoc/Auxil";
import ButtonList from "./ButtonList";

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
    {
      setSortConfigForHeaders({ key, direction });
      toggleActiveSort({ buttonKey: 0 });
    }
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
            {
              <ButtonList
                requestSort={requestSort}
                setButtonActive={setButtonActive}
                activeSort={activeSort}
              />
            }
            {/* {
              <ul>
                <li>
                  <button
                    className={
                      activeSort.buttonKey == 1
                        ? classes.ActiveSort
                        : classes.SortDropdownButton
                    }
                    onClick={() => {
                      requestSort(
                        "productActive",
                        "onSale",
                        "organic",
                        "normal"
                      );
                      setButtonActive("1");
                    }}
                  >
                    Active/Inactive
                  </button>
                </li>
                <li>
                  <button
                    className={
                      activeSort.buttonKey == 2
                        ? classes.ActiveSort
                        : classes.SortDropdownButton
                    }
                    onClick={() => {
                      requestSort(
                        "productActive",
                        "organic",
                        "onSale",
                        "normal"
                      );
                      setButtonActive("2");
                    }}
                  >
                    Active OG
                  </button>
                </li>
                <li>
                  <button
                    className={
                      activeSort.buttonKey == 3
                        ? classes.ActiveSort
                        : classes.SortDropdownButton
                    }
                    onClick={() => {
                      requestSort(
                        "productActive",
                        "organic",
                        "onSale",
                        "reverse2"
                      );
                      setButtonActive("3");
                    }}
                  >
                    Active CV
                  </button>
                </li>
                <li>
                  <button
                    className={
                      activeSort.buttonKey == 4
                        ? classes.ActiveSort
                        : classes.SortDropdownButton
                    }
                    onClick={() => {
                      requestSort(
                        "productActive",
                        "onSale",
                        "organic",
                        "normal"
                      );
                      setButtonActive("4");
                    }}
                  >
                    On Sale Active
                  </button>
                </li>
                <li>
                  <button
                    className={
                      activeSort.buttonKey == 5
                        ? classes.ActiveSort
                        : classes.SortDropdownButton
                    }
                    onClick={() => {
                      requestSort(
                        "organic",
                        "onSale",
                        "productActive",
                        "normal"
                      );
                      setButtonActive("5");
                    }}
                  >
                    On Sale Organic
                  </button>
                </li>
                <li>
                  <button
                    className={
                      activeSort.buttonKey == 6
                        ? classes.ActiveSort
                        : classes.SortDropdownButton
                    }
                    onClick={() => {
                      requestSort(
                        "organic",
                        "onSale",
                        "productActive",
                        "reverse1"
                      );
                      setButtonActive("6");
                    }}
                  >
                    On Sale CV
                  </button>
                </li>
                <li>
                  <button
                    className={
                      activeSort.buttonKey == 7
                        ? classes.ActiveSort
                        : classes.SortDropdownButton
                    }
                    onClick={() => {
                      requestSort(
                        "productActive",
                        "onSale",
                        "organic",
                        "reverse1"
                      );
                      setButtonActive("7");
                    }}
                  >
                    On Sale-Inactive
                  </button>
                </li>
                <li>
                  <button
                    className={
                      activeSort.buttonKey == 8
                        ? classes.ActiveSort
                        : classes.SortDropdownButton
                    }
                    onClick={() => {
                      requestSort(
                        "productActive",
                        "organic",
                        "onSale",
                        "reverse1and2"
                      );
                      setButtonActive("8");
                    }}
                  >
                    Inactive CV
                  </button>
                </li>
                <li>
                  <button
                    className={
                      activeSort.buttonKey == 9
                        ? classes.ActiveSort
                        : classes.SortDropdownButton
                    }
                    onClick={() => {
                      requestSort(
                        "productActive",
                        "organic",
                        "onSale",
                        "reverse2"
                      );
                      setButtonActive("9");
                    }}
                  >
                    Inactive OG
                  </button>
                </li>
              </ul>
            } */}
          </div>
        ) : null}
      </div>
      <table className={classes.InvProdTable}>
        <thead className={classes.InvProdHeader}>
          <tr>
            <th
              className={
                activeHeaderSort.headerKey == 1 &&
                sortConfigForHeaders.direction == "descending"
                  ? classes.InvProdHeaderAsc
                  : activeHeaderSort.headerKey == 1 &&
                    sortConfigForHeaders.direction == "ascending"
                  ? classes.InvProdHeaderDesc
                  : classes.InvProdHeader
              }
              onClick={() => {
                requestSortForHeaders("id");
                setHeaderActive("1");
              }}
              scope="col"
            >
              VIN
            </th>
            <th
              className={
                activeHeaderSort.headerKey == 2 &&
                sortConfigForHeaders.direction == "descending"
                  ? classes.InvProdHeaderAsc
                  : activeHeaderSort.headerKey == 2 &&
                    sortConfigForHeaders.direction == "ascending"
                  ? classes.InvProdHeaderDesc
                  : classes.InvProdHeader
              }
              onClick={() => {
                requestSortForHeaders("name");
                setHeaderActive("2");
              }}
              scope="col"
            >
              Name
            </th>
            <th
              className={classes.InvProdHeader}
              onClick={() => requestSortForHeaders("retailPrice")}
              scope="col"
            >
              Price
            </th>
            <th
              className={classes.InvProdHeader}
              onClick={() => requestSortForHeaders("caseSize")}
              scope="col"
            >
              Case
            </th>
            <th className={classes.InvProdHeader} scope="col">
              Unit
            </th>
            <th className={classes.InvProdHeader} scope="col">
              Cost
            </th>
            <th className={classes.InvProdHeader} scope="col">
              Expected Inv
            </th>
            <th className={classes.InvProdHeader} scope="col">
              ITB
            </th>
            <th className={classes.InvProdHeader} scope="col">
              Predicted Floor
            </th>
            <th className={classes.InvProdHeader} scope="col">
              OTF
            </th>
            <th className={classes.InvProdHeader} scope="col">
              Sell
            </th>
            <th className={classes.InvProdHeader} scope="col">
              Selling
            </th>
            <th className={classes.InvProdHeader} scope="col">
              Par
            </th>
            <th className={classes.InvProdHeader} scope="col">
              Fill
            </th>
            <th className={classes.InvProdHeader} scope="col">
              Suggested
            </th>
            <th className={classes.InvProdHeader} scope="col">
              Order
            </th>
          </tr>
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

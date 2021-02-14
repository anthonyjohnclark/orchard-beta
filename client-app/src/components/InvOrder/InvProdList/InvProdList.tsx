import React from "react";
import classes from "../InvProdList/InvProdList.module.css";
import InvProduct from "./InvProd/InvProduct";
import Auxil from "../../../hoc/Auxil";
import ButtonList from "./InvProdListComponents/ButtonList";
import TableHeaders from "./InvProdListComponents/TableHeaders";
import SortFilterButton from "./InvProdListComponents/SortFilterButton";
import { IProductsWithInput } from "../../../models/IProducts"
import { ISortConfigForHeaders } from "../../../models/ISortFilterConfig"

interface IProps  {
  setFilterEnabled: (filterEnabled: boolean, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  toggleDropdown: React.Dispatch<React.SetStateAction<boolean>>
  activeSort: {buttonKey: number;}
  requestSort: (id: number, primaryKey: string, secondaryKey: string, tertiaryKey: string, direction: string) => void
  setButtonActive: (buttonKey: number) => void;
  activeHeaderSort: {headerKey: number;}
  setHeaderActive: (headerKey: number) => void;
  requestSortForHeaders: (key: string) => void;
  sortConfigForHeaders: ISortConfigForHeaders;
  updateInputChanged: (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => void
  sortedAndFilteredProducts: IProductsWithInput[];
  filterEnabled: boolean
  dropdown: boolean

}

const InvProdList: React.FC<IProps> = ({
  filterEnabled,
  setFilterEnabled, 
  dropdown, 
  toggleDropdown,
  activeSort,
  requestSort,
  setButtonActive,
  sortedAndFilteredProducts,
  updateInputChanged,
  sortConfigForHeaders,
  requestSortForHeaders,
  setHeaderActive,
  activeHeaderSort }) => {

  
  return (
    <Auxil>
       <div className = {classes.InvProdWrapper}>
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
          sortedAndFilteredProducts={sortedAndFilteredProducts}
          //Potentially need to pass these for order info?
          // salesPrediction={salesPrediction}
          // todaysSales={todaysSales}
        />
      </table>
      {/* <InvOrderSummary
      todaysSales={todaysSales}
      salesPrediction={salesPrediction}
      products = {productsWithInputs}
      setOrderToSuggested = {setOrderToSuggested}
      ></InvOrderSummary> */}
      </div>
    </Auxil>
  );
};
export default InvProdList;

/* <th scope="col">Trending</th>
<th scope="col">GIG</th>
/* <th scope="col">Sold Yesterday</th>


<th scope="col">Shrink</th> */

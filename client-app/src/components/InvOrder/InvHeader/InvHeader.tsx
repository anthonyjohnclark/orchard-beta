import React from "react";
import classes from "../InvHeader/InvHeader.module.css";
import Countdown from "./InvHeaderComponents/Countdown";
import SearchBar from "./InvHeaderComponents/SearchBar";
import SalesPredictor from "./InvHeaderComponents/SalesPredictor";
import TodaysSales from "./InvHeaderComponents/TodaysSales";
import Auxil from "../../../hoc/Auxil";

interface IProps  {
  setNewTodaysSales: (newToddaysSales: number, name: string) => void
  setNewSalesPrediction: (newSalesNumber: number, name: string) => void
  setNewSearch: (newSearchText: string) => void
  todaysSales: number;
  salesPrediction: number;
  toggleIsOrderable: () => void;
}

const InvHeader: React.FC<IProps> = ({
  setNewSalesPrediction,
  setNewTodaysSales,
  setNewSearch,
  todaysSales,
  salesPrediction,
  toggleIsOrderable
 }) => {
  return (
      <Auxil>
      <div className={classes.InvHeader}>
        <Countdown
          toggleIsOrderable = {toggleIsOrderable}
        />
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
      </Auxil>
  );
};

export default InvHeader;

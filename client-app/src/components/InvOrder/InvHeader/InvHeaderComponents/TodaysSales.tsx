import React from "react";
import classes from "./TodaysSales.module.css";

const TodaysSales = (props: any) => {
  return (
    <div className={classes.TodaysSales}>
      <div className={classes.TodaysSalesText}>
        <p>Today's Sales</p>
      </div>
      <input
        type="number"
        defaultValue= '15000'  //this will eventually be dynamic based on what previous day's order's Predicted Sales is. will still be changeable by user input
        onChange={(number) => props.setNewTodaysSales(number.target.value)}
      />
    </div>
  );
};

export default TodaysSales;

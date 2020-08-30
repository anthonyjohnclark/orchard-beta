import React from "react";
import classes from "./SalesPredictor.module.css";

const SalesPredictor = (props: any) => {
  return (
    <div className={classes.SalesPredictor}>
      <div className={classes.SalesPredictorText}>
        <p>Predicted Sales</p>
      </div>
      <input
        type="number"
        placeholder="Enter predicted sales here..."
        onChange={(number) => props.setNewSalesPrediction(number.target.value)}
      />
    </div>
  );
};

export default SalesPredictor;

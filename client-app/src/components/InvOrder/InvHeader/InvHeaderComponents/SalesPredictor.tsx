import React, { useState } from "react";
import classes from "./SalesPredictor.module.css";

const SalesPredictor = (props: any) => {
  let value = props.salesPrediction;

  const [isEditing, theEditingState] = useState(false);

  const setEditingState = () => {
    theEditingState(!isEditing);
    console.log(isEditing);
  };

  const formatSalesPrediction = (value: any) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return formatter.format(value);
  };

  return (
    <div className={classes.SalesPredictor}>
      <div className={classes.SalesPredictorText}>
        <p>Predicted Sales</p>
      </div>
      {isEditing ? (
        <input
          type="number"
          placeholder="Enter predicted sales here..."
          onChange={(number) => {
            props.setNewSalesPrediction(number.target.value);
          }}
          onBlur={setEditingState}
          value={value}
        />
      ) : (
        <input
          type="text"
          placeholder="Enter predicted sales here..."
          onFocus={setEditingState}
          value={formatSalesPrediction(value)}
          readOnly
        />
      )}
    </div>
  );
};

export default SalesPredictor;

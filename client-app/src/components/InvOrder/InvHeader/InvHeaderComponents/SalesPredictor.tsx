import React, { useState } from "react";
import classes from "./SalesPredictor.module.css";

const SalesPredictor = (props: any) => {
  let value = props.salesPrediction;

  const [isEditing, theEditingState] = useState(false);

  const setEditingState = () => {
    theEditingState(!isEditing);
    console.log(isEditing);
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      setEditingState();
    }
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
          name = "SalesPrediction"
          type="number"
          placeholder="Enter predicted sales here..."
          onChange={(e) => {
            props.setNewSalesPrediction(e.target.value, e.target.name);
          }}
          onBlur={setEditingState}
          value={value ? value : undefined}
          onKeyDown={(e) => handleKeyPress(e)}
          min= "0"
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

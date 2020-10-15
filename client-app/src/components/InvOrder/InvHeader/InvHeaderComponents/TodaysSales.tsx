import React, { useState } from "react";
import classes from "./TodaysSales.module.css";

const TodaysSales = (props: any) => {
  let value = props.todaysSales;

  const [isEditing, theEditingState] = useState(false);

  const setEditingState = () => {
    theEditingState(!isEditing);
    console.log(isEditing);
  };

  const formatTodaysSales = (value: any) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return formatter.format(value);
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      setEditingState();
    }
  };

  return (
    <div className={classes.TodaysSales}>
      <div className={classes.TodaysSalesText}>
        <p>Today's Sales</p>
      </div>
      {isEditing ? (
        <input
        name ="TodaysSales"
          type="number"
          placeholder="Enter today's sales here..."
          onChange={(e) => {
            props.setNewTodaysSales(e.target.value);
          }}
          onBlur={setEditingState}
          value={value ? value : undefined}
          onKeyDown={(e) => handleKeyPress(e)}
        />
      ) : (
        <input
          type="text"
          placeholder="Enter predicted sales here..."
          onFocus={setEditingState}
          value={formatTodaysSales(value)}
          readOnly
        />
      )}
    </div>
  );
};

export default TodaysSales;

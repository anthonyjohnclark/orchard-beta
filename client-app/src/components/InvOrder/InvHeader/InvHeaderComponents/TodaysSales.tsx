import React, { useState } from "react";
import classes from "./TodaysSales.module.css";

interface IProps {
  setNewTodaysSales: (newToddaysSales: any, name: string) => void;
  todaysSales: number;
}

const TodaysSales: React.FC<IProps> = ({setNewTodaysSales, todaysSales}) => {
  let value = todaysSales;

  const [isEditing, theEditingState] = useState(false);

  const setEditingState = () => {
    theEditingState(!isEditing);
    console.log(isEditing);
  };

  const formatTodaysSales = (value: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return formatter.format(value);
  };

  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
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
            setNewTodaysSales(e.target.value, e.target.name);
          }}
          onBlur={setEditingState}
          value={value ? value : undefined || ""}
          onKeyDown={(e) => handleKeyPress(e)}
          min= "0"
        />
      ) : (
        <input
          type="text"
          placeholder="Enter predicted sales here..."
          onFocus={setEditingState}
          value={formatTodaysSales(value) || ""}
          readOnly
        />
      )}
    </div>
  );
};

export default TodaysSales;

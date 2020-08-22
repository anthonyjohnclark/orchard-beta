import React, { useState, useEffect } from "react";
import classes from "./Countdown.module.css";

const Countdown = () => {
  const calculateTimeLeft = () => {
    let time = new Date();
    let difference = new Date(
      +new Date(time.getFullYear(), time.getMonth(), time.getDate(), 21, 0, 0) -
        +new Date(
          time.getFullYear(),
          time.getMonth(),
          time.getDate(),
          time.getHours(),
          time.getMinutes(),
          time.getSeconds()
        )
    );

    if (difference.getTime() > 0) {
      let timeLeft = difference;
      return timeLeft;
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  let styles: any = [classes.CountdownTimeLeft];

  if (!!timeLeft && timeLeft.getTime() < 600000) {
    styles.push(classes.Warning);
  }

  if (!!timeLeft && timeLeft.getTime() < 300000) {
    styles.push(classes.Alert);
  }

  return (
    <div className={classes.Countdown}>
      <h3 className={styles.join(" ")}>
        {timeLeft ? (
          <span>
            {timeLeft.toUTCString().slice(17, -4)} until order is due.
          </span>
        ) : (
          <span>Order is past due.</span>
        )}
      </h3>
    </div>
  );
};

export default Countdown;

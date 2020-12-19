import React from "react";
import produceNinjaLogo from "../../assets/images/produceNinjaLogo.png";
import classes from "./Logo.module.css";

const logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={produceNinjaLogo} alt="ProduceNinja"></img>
    </div>
  );
};

export default logo;

import React from "react";
import Auxil from "../../hoc/Auxil";
import classes from "./Layout.module.css";
import NavBar from "../Navigation/NavBar/NavBar";

const layout = (props: any) => (
  <Auxil>
    <NavBar />
    <main className={classes.Content}>{props.children}</main>
  </Auxil>
);

export default layout;

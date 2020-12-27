import React from "react";
import Auxil from "../../hoc/Auxil";
import classes from "./Layout.module.css";
import NavBar from "../Navigation/NavBar/NavBar";

const Layout = (props: any) => (
  <Auxil>
    <NavBar />
    <main className={classes.Content}>{props.children}</main>
  </Auxil>
);

export default Layout;

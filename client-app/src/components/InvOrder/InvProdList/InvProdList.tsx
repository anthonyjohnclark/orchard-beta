import React from "react";
import classes from "../InvProdList/InvProdList.module.css";
import InvProduct from "./InvProd/InvProduct";

const invProdList = (props: any) => {
  return (
    <table className={classes.InvProd}>
      <thead className={classes.InvProdHeader}>
        <tr>
          <th scope="col">VIN</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Case</th>
          <th scope="col">Unit</th>
          <th scope="col">Cost</th>
          <th scope="col">Expected Inv</th>
          <th scope="col">ITB</th>
          <th scope="col">Predicted Floor</th>
          <th scope="col">OTF</th>
          <th scope="col">Sell</th>
          <th scope="col">Selling</th>
          <th scope="col">Par</th>
          <th scope="col">Fill</th>
          <th scope="col">Suggested</th>
          <th scope="col">Order</th>
        </tr>
      </thead>
      <InvProduct products={props.products} />
    </table>
  );
};
export default invProdList;

/* <th scope="col">Trending</th>
<th scope="col">GIG</th>
/* <th scope="col">Sold Yesterday</th>


<th scope="col">Shrink</th> */

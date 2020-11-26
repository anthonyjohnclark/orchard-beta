import React from "react";
import classes from "./TableHeaders.module.css";

let tableHeaders = [
  { headerKey: 1, name: "VIN", column: "id" },
  { headerKey: 2, name: "Name", column: "name" },
  { headerKey: 3, name: "Cost", column: "cost" },
  { headerKey: 4, name: "Case", column: "caseSize" },
  { headerKey: 5, name: "Sold By", column: "soldBy" },
  { headerKey: 6, name: "Expected Inv", column: "expectedInv" },
  { headerKey: 7, name: "ITB", column: "inTheBack" },
  { headerKey: 8, name: "Predicted Floor", column: "expectedFloor" },
  { headerKey: 9, name: "OTF", column: "onTheFloor" },
  { headerKey: 10, name: "Sell", column: "sell" },
  { headerKey: 11, name: "Selling", column: "selling" },
  { headerKey: 12, name: "Par", column: "par" },
  { headerKey: 13, name: "Fill", column: "fill" },
  { headerKey: 14, name: "Suggested", column: "suggested" },
  { headerKey: 15, name: "Order", column: "id" },
];

const TableHeaders = (props: any) => (
  <tr className={classes.InvProdHeader}>
    {tableHeaders.map((headers) => (
      <th
        key={headers.headerKey}
        className={
          headers.headerKey == props.activeHeaderSort.headerKey &&
          props.sortConfigForHeaders.direction == "descending"
            ? classes.InvProdHeaderAsc
            : headers.headerKey == props.activeHeaderSort.headerKey &&
              props.sortConfigForHeaders.direction == "ascending"
            ? classes.InvProdHeaderDesc
            : classes.InvProdHeader
        }
        onClick={() => {
          props.requestSortForHeaders(headers.column);
          props.setHeaderActive(headers.headerKey);
        }}
        scope="col"
      >
        {headers.name}
      </th>
    ))}
  </tr>
);
export default TableHeaders;

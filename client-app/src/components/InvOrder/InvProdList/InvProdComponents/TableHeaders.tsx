import React from "react";
import classes from "./TableHeaders.module.css";

let tableHeaders = [
  { headerKey: 1, name: "VIN", column: "id" },
  { headerKey: 2, name: "Name", column: "name" },
  { headerKey: 3, name: "Cost", column: "cost" },
  { headerKey: 4, name: "Case", column: "caseSize" },
  { headerKey: 5, name: "Sold By", column: "soldBy" },
  { headerKey: 6, name: "Expected Inv", column: "id" },
  { headerKey: 7, name: "ITB", column: "id" },
  { headerKey: 8, name: "Predicted Floor", column: "id" },
  { headerKey: 9, name: "OTF", column: "id" },
  { headerKey: 10, name: "Sell", column: "id" },
  { headerKey: 11, name: "Selling", column: "id" },
  { headerKey: 12, name: "Par", column: "id" },
  { headerKey: 13, name: "Fill", column: "fill" },
  { headerKey: 14, name: "Suggested", column: "id" },
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

import React, { Component } from "react";
import classes from "../InvProd/InvProduct.module.css";
import Auxil from "../../../../hoc/Auxil";

class InvProduct extends Component<any, any> {
  renderProductRows() {
    return this.props.sortedProducts.map((productTableValues: any) => {
      const {
        id,
        name,
        organic,
        onSale,
        soldBy,
        caseSize,
        retailPrice,
        sold,
        shrink,
        expectedInv,
        expectedFloor,
        par,
        productActive,
      } = productTableValues;

      let styles: any = [classes.InvProd];

      switch (true) {
        case productActive:
          {
            organic
              ? styles.push(classes.OGProdActive)
              : styles.push(classes.CVProdActive);

            if (onSale === true) {
              styles.push(classes.OnSale);
            }
          }
          break;
        default: {
          organic
            ? styles.push(classes.OGProdInactive)
            : styles.push(classes.CVProdInactive);
          if (onSale === true) {
            styles.push(classes.OnSale);
          }
        }
      }
      // if (organic === true) {
      //   styles.push(classes.OGProd);
      // } else {
      //   styles.push(classes.CVProd);
      // }

      return (
        <tr className={styles.join(" ")} key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{retailPrice}</td>
          <td>{caseSize}</td>
          <td>{soldBy}</td>
          <td> {null}</td>
          <td>{expectedInv}</td>
          <td>
            <input type="text">{null}</input>
          </td>
          <td>{expectedFloor}</td>
          <td>
            {" "}
            <input type="text">{null}</input>
          </td>
          <td>{sold}</td>
          <td>{null}</td>
          <td>{par}</td>
          <td>{null}</td>
          <td>{null}</td>
          <td>
            <input type="text">{null}</input>
          </td>
        </tr>
      );
    });
  }

  render() {
    return <tbody>{this.renderProductRows()}</tbody>;
  }
}
export default InvProduct;

import React, { Component } from "react";
import classes from "../InvProd/InvProduct.module.css";

class InvProduct extends Component<any, any> {
  renderProductRows() {
    return this.props.products.map((productValues: any) => {
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
      } = productValues;

      let styles: any = [classes.InvProd];

      switch (true) {
        case organic:
          styles.push(classes.OGProd);
          break;
        default:
          styles.push(classes.CVProd);
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
          <td>{null}</td>
          <td>{expectedInv}</td>
          <td>{null}</td>
          <td>{expectedFloor}</td>
          <td>{null}</td>
          <td>{sold}</td>
          <td>{null}</td>
          <td>{par}</td>
          <td>{null}</td>
          <td>{null}</td>
          <td>{null}</td>
        </tr>
      );
    });
  }

  render() {
    return <tbody>{this.renderProductRows()}</tbody>;
  }
}
export default InvProduct;

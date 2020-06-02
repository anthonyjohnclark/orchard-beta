import React, { Component } from "react";
import classes from "../InvProd/InvProduct.module.css";

class InvProduct extends Component<any, any> {
  renderProductRows() {
    return this.props.products.map((product: any) => {
      const { vin, name, organic, onSale } = product;
      let styles: any = null;
      if (organic === true) {
        styles = classes.OGProd;
      }

      return (
        <tr className={styles} key={vin}>
          <td>{vin}</td>
          <td>{name}</td>
          <td>{organic}</td>
          <td>{onSale}</td>
        </tr>
      );
    });
  }

  render() {
    return <tbody>{this.renderProductRows()}</tbody>;
  }
}
export default InvProduct;

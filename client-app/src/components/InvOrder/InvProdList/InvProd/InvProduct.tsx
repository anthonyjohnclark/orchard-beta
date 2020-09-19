import React from "react";
import classes from "../InvProd/InvProduct.module.css";

const InvProduct = (props: any) => {
  const renderProductRows = () => {
    return props.sortedAndFilteredProducts.map(
      (productTableValues: any, index: any) => {
        const {
          id,
          name,
          organic,
          onSale,
          soldBy,
          caseSize,
          cost,
          retailPrice,
          sell,
          shrink,
          expectedInv,
          expectedFloor,
          inTheBack,
          onTheFloor,
          selling,
          par,
          fill,
          suggested,
          order,
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
          <tr className={styles.join(" ")} key={productTableValues.id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{cost}</td>
            <td>{caseSize}</td>
            <td>{soldBy}</td>
            <td>{expectedInv}</td>
            <td>
              <input type="text">{null}</input>
            </td>
            <td>{expectedFloor}</td>
            <td>
              <input type="text">{null}</input>
            </td>
            <td>{sell}</td>
            <td>{selling}</td>
            <td>{par}</td>
            <td>{fill}</td>
            <td>{props.todaysSales}</td>
            <td key={index}>
              <input
                type="number"
                value={productTableValues.order}
                name="order"
                onChange={props.updateInputChanged(id)}
              ></input>
            </td>
          </tr>
        );
      }
    );
  };

  {
    return <tbody>{renderProductRows()}</tbody>;
  }
};
export default InvProduct;

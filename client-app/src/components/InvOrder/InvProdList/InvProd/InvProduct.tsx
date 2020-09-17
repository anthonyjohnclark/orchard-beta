import React from "react";
import classes from "../InvProd/InvProduct.module.css";

const InvProduct = (props: any) => {
  // let productsNew = props.sortedAndFilteredProducts.map((products: any) => ({
  //   ...products,
  //   order: "",
  //   sell: "",
  //   selling: "",
  //   suggested: "",
  // }));

  // const [inputs, setProductInput] = useState([productsNew]);

  // const updateInputChanged = (index: any) => (e: any) => {
  //   console.log("index: " + index);
  //   console.log("property name: " + e.target.name);
  //   console.log("value: " + e.target.value);

  //   console.log(inputs);
  //   let productsWithInput = [...productsNew]; // copying the old datas array
  //   productsWithInput[index].order = e.target.value; // replace e.target.value with whatever you want to change it to

  //   console.log(productsNew);

  //   setProductInput(productsWithInput); // ??
  // };

  const renderProductRows = () => {
    // let productTable: any = [];

    // if (inputs.length > 1) {
    //   productTable = [...inputs];
    // } else {
    //   productTable = productsNew;
    // }

    // console.log(productsNew);
    // console.log(inputs);

    // console.log(productTable);

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
            <td>{null}</td>
            <td>{par}</td>
            <td>{fill}</td>
            <td>{props.todaysSales}</td>
            <td key={index}>
              <input
                key={order}
                type="number"
                value={order}
                name="order"
                onChange={props.updateInputChanged(index)}
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

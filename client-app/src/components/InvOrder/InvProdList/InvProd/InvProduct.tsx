import React, {useState, useEffect} from "react";
import Auxil from "../../../../hoc/Auxil";
import classes from "../InvProd/InvProduct.module.css";

const InvProduct = (props: any) => {
	const handleKeypress =  (e:any) => {
    const characterCode = e.key
     const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length ) {
        return
      } else if (characterNumber === 0) {
         e.preventDefault()
      }
    } else {
			 e.preventDefault()
    }
  }

  const [dropDownId, setDropdownId] = useState(null)

  const [dropdown, toggleDropdown] = useState(false);

  const toggleDropdownForOneRow = (id: any) => {
    if (id !== dropDownId ){
      setDropdownId(id);
      if (dropdown == false)
      toggleDropdown(!dropdown);
    }
      if(id == dropDownId || dropDownId == null){
        toggleDropdown(!dropdown);
      }
  }

    // useEffect(() => {
    //    toggleDropdownForOneRow(dropDownId)
    //  }, []);

  const renderProductRows = () => {
    return props.sortedAndFilteredProducts.map((productTableValues: any) => {
      const {
        id,
        name,
        organic,
        onSale,
        soldBy,
        caseSize,
        cost,
        sell,
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
        retailPrice
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


      return (
        <Auxil key={id}>
        <tr className={styles.join(" ")} key={id} onClick={() => toggleDropdownForOneRow(id)}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{cost}</td>
          <td>{caseSize}</td>
          <td>{soldBy}</td>
          <td>{expectedInv}</td>
          <td>
            <input
              type="number"
              value={inTheBack}
              name="inTheBack"
              onChange={props.updateInputChanged(id)}
              min= "0">
            </input>{" "}
          </td>
          <td>{expectedFloor}</td>
          <td>
            <input
              type="number"
              value={onTheFloor}
              name="onTheFloor"
              onChange={props.updateInputChanged(id)}
               max = {fill}
              min= "0"
            ></input>{" "}
          </td>
          <td>{sell}</td>
          <td>{selling}</td>
          <td>{par}</td>
          <td>{fill}</td>
          <td>{suggested}</td>
          <td>
            <input
              type="number"
              value={order}
              name="order"
              onChange={props.updateInputChanged(id)}
              onKeyPress={handleKeypress}
              min = "1"
            ></input>
          </td>
        </tr>
        {dropdown && productTableValues.id == dropDownId ? (<tr className={styles.join(" ")}><td>{retailPrice}</td></tr>): null}
        </Auxil>
       )});
  };

  {
    return <tbody>{renderProductRows()}</tbody>;
  }
};
export default InvProduct;

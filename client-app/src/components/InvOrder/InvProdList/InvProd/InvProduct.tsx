import React, {useState} from "react";
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

  const toggleDropdownForOneRow = (id: any, e:any) => {
      //I'm not really sure why this stopPropogation  
      //works the way it does or why I do it this way to be honest.
    if (e.target.name !== "order" && e.target.name !== "inTheBack" && e.target.name !== "onTheFloor"){
        e.stopPropagation()   
    
      //above conditional wraps the whole rest of the logic. 
      //I feel like there is a better way I need to figure out.

    if (id !== dropDownId ){
      setDropdownId(id);
      if (dropdown == false)
      toggleDropdown(!dropdown);
    }
      if(id == dropDownId || dropDownId == null){
        toggleDropdown(!dropdown);
      }
    }
      }

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
        retailPrice,
        netGIG, 
        percentSales,
        shrink,
        sold
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
        <tr className={styles.join(" ")} key={id} onClick={(e) => toggleDropdownForOneRow(id, e)}>
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
        {dropdown && productTableValues.id == dropDownId ? 
        (<tr>
          <td colSpan={15}>
            <div className = {classes.InvProdDropdown}>
            <h2>Retail Price: {retailPrice}</h2>
            <h2>netGIG: {netGIG}</h2>
            <h2>sold: {sold}</h2>
            <h2>percentSales: {percentSales}%</h2>
            <h2>shrink: {shrink}</h2>
            </div>
            </td>
          </tr>)
            : null}
        </Auxil>
       )});
  };

  {
    return <tbody>{renderProductRows()}</tbody>;
  }
};
export default InvProduct;

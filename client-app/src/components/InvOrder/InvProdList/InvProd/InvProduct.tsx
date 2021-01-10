import React, { useState } from "react";
import Auxil from "../../../../hoc/Auxil";
import classes from "../InvProd/InvProduct.module.css";
import { IProductsWithInput } from "../../../../models/IProducts"

interface IProps {
  updateInputChanged: (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => void
  sortedAndFilteredProducts: IProductsWithInput[];
}

const InvProduct: React.FC<IProps> = ({updateInputChanged, sortedAndFilteredProducts}) => {
  
	const handleKeypress =  (e:React.KeyboardEvent<HTMLInputElement>) => {
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

  const [dropDownId, setDropdownId] = useState(Number)

  const [dropdown, toggleDropdown] = useState(false);

  const toggleDropdownForOneRow = (id: number, e:React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      //I'm not really sure why this stopPropogation  
      //works the way it does or why I do it this way to be honest.
      const element = e.target as HTMLInputElement
    if (element.name !== "order" && element.name !== "inTheBack" && element.name !== "onTheFloor"){
        e.stopPropagation()   
    
      //above conditional wraps the whole rest of the logic. 
      //I feel like there is a better way I need to figure out.

    if (id !== dropDownId ){
      setDropdownId(id);
      if (dropdown === false)
      toggleDropdown(!dropdown);
    }
      if(id === dropDownId || dropDownId === null)
        toggleDropdown(!dropdown);
  
    }
      }

  const renderProductRows = () => {
    return sortedAndFilteredProducts.map((sortedAndFilteredProducts) => {
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
      } = sortedAndFilteredProducts;

      let styles: string[] = [classes.InvProd];

      switch (true) {
        case productActive:
          
            organic
              ? styles.push(classes.OGProdActive)
              : styles.push(classes.CVProdActive);
            if (onSale === true) {
              styles.push(classes.OnSale);
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
        <tr key={id}>
          <td colSpan = {15}>
      <tr className={styles.join(" ")} onClick={(e) => toggleDropdownForOneRow(id, e)}>         
          <td>{id}</td>
          <td>{name}</td>
          <td>{cost}</td>
          <td>{caseSize}</td>
          <td>{soldBy}</td>
          <td>{expectedInv}</td>
          <td>
            <input
              type="number"
              value={inTheBack === 0 ? "" :inTheBack}
              name="inTheBack"
              onChange={updateInputChanged(id)}
              min= "0">
            </input>{" "}
          </td>
          <td>{expectedFloor}</td>
          <td>
            <input
              type="number"
              value={onTheFloor === 0 ? "" :onTheFloor}
              name="onTheFloor"
              onChange={updateInputChanged(id)}
              max = {fill}
              min= "0"
            ></input>{" "}
          </td>
          <td>{sell === 0 ? "" : sell}</td>
          <td>{selling === 0 ? "" :selling}</td>
          <td>{par}</td>
          <td>{fill}</td>
          <td>{suggested}</td>
          <td>
            <input
              type="number"
              value={order === 0 ? "" :order}
              name="order"
              onChange={updateInputChanged(id)}
              onKeyPress={handleKeypress}
              min = "1"
            ></input>
          </td>
        </tr>
        {dropdown && sortedAndFilteredProducts.id === dropDownId ? 
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
            </td>
            </tr>
       )});
  };
  
    return(
    <Auxil>
      <div className = {classes.ScrollWrap}>
      <tbody>{renderProductRows()}</tbody>
      </div>
    </Auxil>
    );

};
export default InvProduct;

import React from "react";
import Auxil from "../../../../hoc/Auxil";
import { IProductsWithInput } from "../../../../models/InvOrderModels/IProducts"
import classes from "../InvProd/InvProduct.module.css";
import ProductRows from "../../../../hoc/ProductRows";


interface IProps {
   updateInputChanged: (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => void
  sortedAndFilteredProducts: IProductsWithInput[];
}

const InvProduct: React.FC<IProps> = ({ sortedAndFilteredProducts, updateInputChanged}) => {
  
    return(
    <Auxil>
      <div className = {classes.ScrollWrap}>
      <tbody>
        <ProductRows
          productArray ={sortedAndFilteredProducts}
          updateInputChanged = {updateInputChanged}
          rowsType = {"InvTable"}
        />
        </tbody>
      </div>
    </Auxil>
    );

};
export default InvProduct;

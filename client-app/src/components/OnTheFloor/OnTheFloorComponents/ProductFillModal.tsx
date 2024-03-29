import React from 'react';
import { ISelectedProduct } from '../../../models/OnTheFloorModels/FloorObjects';
import classes from './ProductFillModal.module.css'

interface IProps  {
    toggleAlertModal: () => void;
    closeBothModals: () => void;
    selectedProduct: ISelectedProduct;
    addProductToTable: () => void;
    updateNewFillValue: (newFillValue: number) => void;
}

const ProductFillModal: React.FC<IProps> = ({
    toggleAlertModal,
    closeBothModals,
    selectedProduct,
    addProductToTable,
    updateNewFillValue }) => 
{

return (
    <React.Fragment>
        <div className = {classes.ProdFillModal}>
            <h3>
                How many boxes of <span style ={selectedProduct.organic ?{color: "#7fb069", fontSize: 24}:{color: "#7678ed", fontSize: 24} }>{selectedProduct.name}</span> fit on the table?:
            </h3>
            <input value = {selectedProduct.tableFill} type = "number"  onChange ={(e:React.BaseSyntheticEvent) => {updateNewFillValue(e.target.value)}}>
            </input>
            <button 
            className = {classes.ProdFillEnterButton}
            onClick = {() =>{closeBothModals(); addProductToTable()}} 
            > Enter </button>
            <button className = {classes.ProdFillBackButton} 
            onClick={ toggleAlertModal }
            > Back </button>
        </div>
    </React.Fragment>
    )
}
export default ProductFillModal;
import React from 'react';
import classes from './ProductFillModal.module.css'


interface IProps  {
    toggleAlertModal: () => void;
    closeBothModals: () => void
    selectedProduct: any;
    addProductToTable: () => void;
    updateNewFillValue: (newFillValue: any) => void;
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
                How many boxes of {selectedProduct.name} fit on the table?:
            </h3>
            <input type = 'number' min = "1" onChange ={(e) => {updateNewFillValue(e.target.value)}}>
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
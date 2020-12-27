import React from 'react';
import classes from './InvPreviewModal.module.css'
import buttonClasses from './InvOrderButton.module.css'
import { IOrderedProducts } from "../../../../models/Products"

interface IProps  {
    orderedProducts: IOrderedProducts[]; 
    totalPieces: number; 
    totalCost: string;  
}

const InvPreviewModal: React.FC<IProps> = ({
    orderedProducts, 
    totalPieces, 
    totalCost  }) => 
    {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

return (
    <div className={classes.InvPreviewModal}>
             <table>
                <thead>
                <tr>
                    <th>VIN</th>
                    <th>Name</th>
                    <th>Ordered</th>
                    <th>Cost</th>
                </tr>
            </thead> 
            <div className = {classes.ScrollWrap}>
            <tbody>
            <tr>
                <td colSpan = {4}>

            {orderedProducts.map(products => { 
            if (products.ordered > 0) {
                return(
                <tr className = {classes.InvSummaryModalRow} key ={products.productVIN}>
                <td>{products.productVIN}</td>
                <td>{products.productName}</td>
                <td>{products.ordered}</td>
                <td>{formatter.format(products.totalCost)}</td>
                </tr>
                )} return null  
            })}
                </td>
                </tr>
            </tbody>
            </div>
            </table>
    <div className = {classes.InvModalSummary}>
        <div className = {classes.InvModalTotals}>
        <span>Pieces: </span><p>{totalPieces}</p>
        <span>Total: </span><p>{totalCost}</p>
        </div>
        <div>
            <button className = {buttonClasses.InvOrderButton}>
            Confirm Order
            </button>
        </div>
    </div>
    </div>
    )
}
export default InvPreviewModal;
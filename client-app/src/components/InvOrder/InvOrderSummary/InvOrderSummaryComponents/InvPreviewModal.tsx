import React from 'react';
import classes from './InvPreviewModal.module.css'
import buttonClasses from './InvOrderButton.module.css'
import { IOrderedProducts } from "../../../../models/InvOrderModels/IProducts"
import ProductRows from '../../../../hoc/ProductRows';

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
   
return (
    <div className={classes.InvPreviewModal}>
             <table>
                <thead>
                <tr style={{backgroundColor: "#221d23", width: 472}}>
                    <h3>Confirm Your Order:</h3>
                </tr>
                <tr style={{width: 472}}>
                    <th>VIN</th>
                    <th>Name</th>
                    <th>Ordered</th>
                    <th>Cost</th>
                </tr>
            </thead> 
            <div className = {classes.ScrollWrap}>
            <tbody>
            <ProductRows
            productArray ={orderedProducts}
            rowsType = {"orderedProducts"}
            />
            </tbody>
            </div>
            <tfoot >
            <tr style = {{width: 472}}>
                <td colSpan = {4} style = {{width: 472}}>
                <td style = {{width: 118}}>
                <button className = {buttonClasses.InvOrderButton} style = {{width: 236}}>
                Confirm Order
                </button>
                </td>
                <td style = {{width: 118, textAlign: "center"}}  >
                {totalPieces}
                </td>
                <td style = {{width: 120, textAlign: "center"}}>
                {totalCost}
                </td>
                </td>
            </tr>
            </tfoot>
            </table>
            </div>
    /* <div className = {classes.InvModalSummary}>
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
    ) */
)}
export default InvPreviewModal;
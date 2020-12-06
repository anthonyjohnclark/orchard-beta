import React from 'react';
import classes from './InvPreviewModal.module.css'
import buttonClasses from './InvOrderButton.module.css'

const InvPreviewModal = (props:any) => {

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

            {props.orderedProducts.map((products:any) => { 
            if (products.ordered > 0)
          return(
                <tr className = {classes.InvSummaryModalRow}>
                <td>{products.productVIN}</td>
                <td>{products.productName}</td>
                <td>{products.ordered}</td>
                <td>{formatter.format(products.totalCost)}</td>
                </tr>
                )})}
                </td>
                </tr>
            </tbody>
            </div>
            </table>
    <div className = {classes.InvModalSummary}>
        <div className = {classes.InvModalTotals}>
        <span>Pieces: </span><p>{props.totalPieces}</p>
        <span>Total: </span><p>{props.totalCost}</p>
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
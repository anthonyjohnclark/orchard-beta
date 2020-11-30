import React from 'react';
import classes from './InvPreviewModal.module.css'

const InvPreviewModal = (props:any) => {
return (
    <div className={classes.InvPreviewModal}>
    <ul>
        <li>
            <p>ProductName</p>
            <p>NumberOrdered</p>
            <p>Cost</p>
        </li>
    </ul>
    <div>
        <h3>Total Pieces:</h3>
        <h3>Total Cost:</h3>
    </div>
    </div>
    )
}

export default InvPreviewModal;
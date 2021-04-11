import React, { useState } from "react";
import PostRequests from "./../../../../functions/PostRequests";
import classes from "./OrderSubmitConfirmationModal.module.css";


interface IProps  {
    orderSubmitObject: any;
    toggleAlertModal: () => void;  
}

const OrderSubmitConfirmationModal: React.FC<IProps>  = ({
    orderSubmitObject,
    toggleAlertModal
  }) => {

    const [loading, setLoadingState] = useState(false)

    let postOrderHandler = (orderSubmitObject:any) => {
        PostRequests.postOrder(orderSubmitObject)
        .then(response => {setLoadingState(true)})
        .catch(error => {setLoadingState(true)})
    }

    return (
        <div className = {classes.OrderSubmit}>
        <h3>
            Are you sure you want to submit your order?
        </h3>
        <button 
        className = {classes.OrderSubmitOrderButton}
        onClick = {() => postOrderHandler(orderSubmitObject)} 
        > Submit </button>
        <button  
        className = {classes.OrderSubmitBackButton}
        onClick = {() => toggleAlertModal()}
        > Back </button>
    </div>
    )
}

export default OrderSubmitConfirmationModal;
import React, { useState } from "react";
import Auxil from "../../../../hoc/Auxil";
import Spinner from "../../../../hoc/Spinner";
import classes from "./OrderSubmitConfirmationModal.module.css";
import agent from "../../../../api/agent";

interface IProps  {
    orderSubmitObject: any;
    toggleAlertModal: () => void;  
}

const OrderSubmitConfirmationModal: React.FC<IProps>  = ({
    orderSubmitObject,
    toggleAlertModal
  }) => {

    const [loading, setLoadingState] = useState(false)
    const [successfulSubmit, setSuccessfulSubmit] = useState(false)


    let postOrderHandler = (orderSubmitObject:any) => {
        setLoadingState(true);

        agent.Orders.postOrder(orderSubmitObject)
        .then(response => {
            setSuccessfulSubmit(true)
            setLoadingState(false)
        })
        .catch(error => {setLoadingState(false)})
    }

    return (
        <div className = {classes.OrderSubmit}>
        {!loading && !successfulSubmit ?                
        <Auxil>    
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
        </Auxil>
        : loading && !successfulSubmit ?
        <Spinner/>
        : successfulSubmit ?
        <h3>
            Your order has been submitted succesfully.
        </h3>
        :
        <h3>
            Something went horribly wrong.
        </h3>}
    </div>
    )
}

export default OrderSubmitConfirmationModal;
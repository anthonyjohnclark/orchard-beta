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
    const [returnedError, setError] = useState("")

    let postOrderHandler = (orderSubmitObject:any) => {
        setLoadingState(true);

        agent.Orders.postOrder(orderSubmitObject)
        .then(response => {
            setLoadingState(false)
            setSuccessfulSubmit(true)
        })
        .catch(error => {
            setError(error.message)
            setLoadingState(false) 
            setSuccessfulSubmit(false)
        })
    }

    return (
        <div className = {classes.OrderSubmit}>
        {!loading && !successfulSubmit && !returnedError ?                
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
        : successfulSubmit &&  !loading ?
        <div className = {classes.OrderSubmitMessages}>
        <h3>
            Your order has been submitted <span style ={{color:"#7fb069"}}> succesfully.</span>
        </h3>
        </div>
        : returnedError && !loading  ?
        <div className = {classes.OrderSubmitMessages}>
        <h3>
            Something went horribly wrong. Here what kind of error this was: 
            <br/>
            <span style = {{color: "#a4031f"}}>{returnedError}</span>
        </h3>
        </div>
        :
        null
        }
    </div>
    )
}

export default OrderSubmitConfirmationModal;
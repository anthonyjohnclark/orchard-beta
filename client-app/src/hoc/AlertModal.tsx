import React from 'react';
import classes from './AlertModal.module.css'
import Backdrop from "./Backdrop";
import Auxil from './Auxil';


const AlertModal = (props:any) => {
    return(
    <Auxil>
        <Backdrop show = {props.show} 
        //backdropClicked={props.modalClosed}
        />
    <div className = {classes.Modal}
        style = {{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
        {props.children}
    </div>
    </Auxil>
    )
};

export default AlertModal;
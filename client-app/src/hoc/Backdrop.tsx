import React from 'react'; 
import classes from './Backdrop.module.css'

const Backdrop = (props: any) => {
return(
    props.show ? <div className = {classes.Backdrop} onClick={props.backdropClicked}></div> : null
)
};

export default Backdrop;
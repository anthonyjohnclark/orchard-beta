import React, { useState } from "react";
import Auxil from "../../../hoc/Auxil";
import Spinner from "../../../hoc/Spinner";
import classes from "./FloorCreationModal.module.css";
import agent from "../../../api/agent"

interface IProps  {
    setFloorName: (name: string) => void,
    floorName: string;
    toggleAlertModal: () => void;
    postFloorObject:any;
}

const FloorCreationModal: React.FC<IProps>  = ({
    setFloorName,
    floorName,
    postFloorObject
  }) => {

    const [loading, setLoadingState] = useState(false)
    const [successfulSubmit, setSuccessfulSubmit] = useState(false)
    const [returnedError, setError] = useState("")

    let postFloorHandler = (floorSubmitObject:any) => {
        setLoadingState(true);

        agent.Floor.postFloor(floorSubmitObject)
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
        <React.Fragment>
        <div className = {classes.FloorCreationModal}>

        {!loading && !successfulSubmit && !returnedError ?
           
            <Auxil>
            <h3>
               Enter a name for this floor plan:
            </h3>
            <input max-length = {200} type = "text" value = {floorName ? floorName:""} onChange={(e) => {setFloorName(e.target.value)}}></input>
            <button 
            className = {classes.FloorCreationModalEnterButton}
            onClick = {() => {postFloorHandler(postFloorObject)}}
            > Save </button>
            </Auxil>

        : loading && !successfulSubmit ?
            <Spinner/>
            
        : successfulSubmit &&  !loading ?

        <div className = {classes.FloorSubmitMessages}>
        <h3>
            Your new floor plan has been created <span style ={{color:"#7fb069"}}> succesfully.</span>
        </h3>
        </div>
        
        : returnedError && !loading  ?

        <div className = {classes.FloorSubmitMessages}>
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
    </React.Fragment>
    )
}

export default FloorCreationModal;
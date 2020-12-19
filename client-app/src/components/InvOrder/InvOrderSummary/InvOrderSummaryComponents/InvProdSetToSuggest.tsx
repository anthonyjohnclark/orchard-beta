import React, {useState} from "react";
import classes from "../InvOrderSummaryComponents/InvProdSetToSuggest.module.css";

interface IProps  {
    setOrderToSuggested: (roundingDirection: boolean, e:React.MouseEvent<HTMLDivElement, MouseEvent>) => void; 
}

const InvProdSetToSuggest:React.FC<IProps> = ({setOrderToSuggested}) => {

    const [roundingDirection, setRoundingDirection] = useState(true)

    const toggleRoundingDirection = () => {
        setRoundingDirection(!roundingDirection)
    }

    // console.log(roundingDirection);
    
    return(
        <div className = {classes.InvProdSetToSuggest}>
            <button className = {classes.SetToSuggestButton}> 
            <div id="revert" onClick = {(e) => setOrderToSuggested(roundingDirection, e)}>
            ↻
            </div> 
            <div id="set" onClick = {(e) => setOrderToSuggested(roundingDirection, e)}>
            Set All to Suggested 
            </div>
            <div onClick={() => toggleRoundingDirection()}>
            {roundingDirection ? <span>▼</span> : <span>▲</span>}
            </div>
        </button>
        </div>
    )
}

export default InvProdSetToSuggest;
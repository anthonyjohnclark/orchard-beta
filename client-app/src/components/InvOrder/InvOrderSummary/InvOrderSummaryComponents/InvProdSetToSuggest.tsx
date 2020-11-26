import React from "react";
import classes from "../InvOrderSummaryComponents/InvProdSetToSuggest.module.css";


const InvProdSetToSuggest = (props: any) => {
    return(
        <div className = {classes.InvProdSetToSuggest}>
            <button className = {classes.SetToSuggestButton}> <span>
            ↻
            </span>      Set All to Suggested 
        <span>
          {props.setRoundingDirection ? <span> ▼</span> : <span> ▲</span>}
        </span>
        </button>
        </div>
    )

}

export default InvProdSetToSuggest;
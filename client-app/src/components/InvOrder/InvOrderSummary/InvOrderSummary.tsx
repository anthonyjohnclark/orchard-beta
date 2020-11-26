import React from "react";
import Auxil from "../../../hoc/Auxil";
import classes from "./InvOrderSummary.module.css"
import InvProdSetToSuggest from "./InvOrderSummaryComponents/InvProdSetToSuggest";
import InvOrderButton from "./InvOrderSummaryComponents/InvOrderButton";

const InvOrderSummary = (props:any) => {
    return (
        <Auxil>
        <div className = {classes.InvOrderSummary}>
        <div className = {classes.InvOrderStatsHeader}>
         <h1>Order Summary</h1> 
         <InvProdSetToSuggest></InvProdSetToSuggest>
         </div>
         <div className = {classes.InvOrderStatsFooter}>
         <p>Total pieces ordered: 352</p>
         <p>Total order cost: 22,000</p>
         <p>Blended gig margin: 8%</p>
         <InvOrderButton></InvOrderButton>
         </div>
         </div>
         </Auxil>)


}

export default InvOrderSummary;
import React from "react";
import Auxil from "../../../hoc/Auxil";
import classes from "./InvOrderSummary.module.css"
import InvProdSetToSuggest from "./InvOrderSummaryComponents/InvProdSetToSuggest";
import InvOrderButton from "./InvOrderSummaryComponents/InvOrderButton";
import { IOrderedProducts } from "../../../models/InvOrderModels/IProducts";

//to-do - find how to calculate blended margin? 
interface IProps  {
    orderable: boolean;
    todaysSales: number; 
    salesPrediction: number; 
    orderedProducts: any; 
    setOrderToSuggested: (roundingDirection: boolean, e:React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    totalCost: string;
    totalPieces: number; 
    orderSubmitObject: any;
  }

const InvOrderSummary: React.FC<IProps>  = ({
    orderable,
    todaysSales, 
    salesPrediction, 
    orderedProducts, 
    setOrderToSuggested,
    totalPieces,
    totalCost, 
    orderSubmitObject
  }) => {

    return (
        <Auxil>
        <div className = {classes.InvOrderSummary}>
        <div className = {classes.InvOrderStatsHeader}>
         <h1>Order Summary</h1> 
        <InvProdSetToSuggest  setOrderToSuggested={setOrderToSuggested}/>
         </div>
         <div className = {classes.InvOrderStatsFooter}>
         <p>Total pieces ordered: {totalPieces}</p>
         <p>Total order cost: {totalCost}</p>
         <p>Blended gig margin: 8%</p>
         <InvOrderButton
         todaysSales={todaysSales}
         salesPrediction={salesPrediction}
         orderedProducts = {orderedProducts}
         totalCost = {totalCost}
         totalPieces = {totalPieces}
         orderSubmitObject = {orderSubmitObject}
         orderable = {orderable}
         ></InvOrderButton>
         </div>
         </div>
         </Auxil>)
}

export default InvOrderSummary;
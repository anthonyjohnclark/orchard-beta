import React, {useState, useEffect} from "react";
import Auxil from "../../../hoc/Auxil";
import classes from "./InvOrderSummary.module.css"
import InvProdSetToSuggest from "./InvOrderSummaryComponents/InvProdSetToSuggest";
import InvOrderButton from "./InvOrderSummaryComponents/InvOrderButton";

//to-do - find how to calculate blended margin? 

const InvOrderSummary = (props:any) => {

let orderedProducts = props.products.map((products: any) =>  (
    {
    productVIN: products.id,
    productName: products.name,
    ordered: products.order ==="" ? 0 : products.order,
    totalCost: products.order * products.cost
  }));

  console.log(orderedProducts)

  //can maybe these next two functions get refactored to one function that returns both?

const [totalPieces, setTotalPieces] = useState(0)

const saveTotalPieces = () => {
let initialValue = 0
let sum = orderedProducts.reduce(
    (accumulator:any, currentValue:any) => accumulator + parseInt(currentValue.ordered)
    , initialValue
)
setTotalPieces(sum);
}

const [totalCost, setTotalCost] = useState("0")

const saveTotalCost = () => {
    let initialValue = 0
    let sum = orderedProducts.reduce(
        (accumulator:any, currentValue:any) => accumulator + currentValue.totalCost
        , initialValue
    )
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

       let formattedSum = formatter.format(sum)

    setTotalCost(formattedSum);
    }
    
useEffect(() => {
    saveTotalCost();
    saveTotalPieces();
  });


    return (
        <Auxil>
        <div className = {classes.InvOrderSummary}>
        <div className = {classes.InvOrderStatsHeader}>
         <h1>Order Summary</h1> 
         <InvProdSetToSuggest
            setOrderToSuggested = {props.setOrderToSuggested}>
        </InvProdSetToSuggest>
         </div>
         <div className = {classes.InvOrderStatsFooter}>
         <p>Total pieces ordered: {totalPieces}</p>
         <p>Total order cost: {totalCost}</p>
         <p>Blended gig margin: 8%</p>
         <InvOrderButton
         todaysSales={props.todaysSales}
         salesPrediction={props.salesPrediction}
         orderedProducts = {orderedProducts}
         totalCost = {totalCost}
         totalPieces = {totalPieces}
         ></InvOrderButton>
         </div>
         </div>
         </Auxil>)
}

export default InvOrderSummary;
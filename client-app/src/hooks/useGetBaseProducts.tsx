import { useState, useEffect, useCallback } from "react"
import { IProductsWithInput } from "../models/IProducts";
import CalculateSuggestedValue from "../functions/CalculateSuggestedValue"
import axios from "axios";

const useGetBaseProducts = (todaysSales:number,salesPrediction:number) => {

const [ inputs, setProductInput ] = useState<IProductsWithInput[]>([]);

useEffect(() => {
  axios
  .get<IProductsWithInput[]>("http://localhost:5000/api/products")
  .then((response) => {
   //  console.log(response);
   let productsNew = response.data.map((prods) => ({
    ...prods,
    inTheBack: 0,
    onTheFloor: 0,
    order: 0,
    sell: 0,
    selling: 0,
    suggested: 0
  }))
  setProductInput(productsNew)
  });}, [])
  
  const updateInputChanged = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
     let productsWithInput = [...inputs];
     let prodID = id;
     const property = e.target.name;
     const prodIndex = productsWithInput.findIndex(({ id }) => id === prodID);
     // console.log(prodIndex);
   productsWithInput[prodIndex][property] = e.target.value;

     if (property === "onTheFloor" || property === "inTheBack") {
       let onTheFloorValue = Number(productsWithInput[prodIndex].onTheFloor);
       let intheBackValue = Number(productsWithInput[prodIndex].inTheBack);
       let sellingValue = Number(productsWithInput[prodIndex].selling);
       let sellValue = Number(productsWithInput[prodIndex].sell);
       let fillValue = Number(productsWithInput[prodIndex].fill);
       let parValue = Number(productsWithInput[prodIndex].par);

       productsWithInput[prodIndex].suggested= 
       parseFloat(CalculateSuggestedValue(
         onTheFloorValue,
         intheBackValue,
         sellingValue,
         sellValue,
         fillValue,
         parValue).toFixed(1))
     }
     setProductInput(productsWithInput);
   };

   const updateSellSelling = useCallback((name:string) => {
    setProductInput(inputs => {
    let productsWithSellSelling = [...inputs];
      productsWithSellSelling.forEach((products) => { 
      if (name ==="TodaysSales"){
        let sellValue = (((todaysSales * (products.percentSales/100))/products.retailPrice))/(products.caseSize)
        products.sell =  parseFloat(sellValue.toFixed(1))
      } else if (name ==="SalesPrediction"){
        let sellValue = (((salesPrediction * (products.percentSales/100))/products.retailPrice))/(products.caseSize)
        products.selling =  parseFloat(sellValue.toFixed(1))
      }         
});
        //this could also get refactored at some point. 
      productsWithSellSelling.forEach((products) => { 

      let onTheFloorValue = Number(products.onTheFloor);
      let intheBackValue = Number(products.inTheBack);
      let sellingValue = Number(products.selling);
      let sellValue = Number(products.sell);
      let fillValue = Number(products.fill);
      let parValue = Number(products.par);

       products.suggested = 
       parseFloat(CalculateSuggestedValue(
         onTheFloorValue,
         intheBackValue,
         sellingValue,
         sellValue,
         fillValue,
         parValue).toFixed(1))
      });
    return productsWithSellSelling;})
  }, [salesPrediction,todaysSales]);

  
  const setOrderToSuggested = (
    roundingDirection:boolean, 
    e:React.MouseEvent<HTMLDivElement, 
    MouseEvent>) => { 

    let productsWithOrderSetToSuggested = [...inputs];
  
    const element = e.target as HTMLInputElement

    if (element.id === 'revert'){
      productsWithOrderSetToSuggested.forEach((products) => {
        products.order = 0
      })
    }

    if (element.id ==='set')
    productsWithOrderSetToSuggested.forEach((products) => {
      if (roundingDirection){
      products.order = Math.floor(products.suggested)
      }
      else if(!roundingDirection) {
        products.order = Math.ceil(products.suggested)
      };
    })
    setProductInput(productsWithOrderSetToSuggested);
  }

   useEffect(() => {
     updateSellSelling("TodaysSales");
     updateSellSelling("SalesPrediction");
   }, [ salesPrediction, todaysSales, updateSellSelling ]);
 

  return  [ inputs, updateInputChanged, updateSellSelling, setOrderToSuggested ] as const;
}

export default useGetBaseProducts;
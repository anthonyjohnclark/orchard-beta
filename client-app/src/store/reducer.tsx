import * as actionTypes from "./actions/actionTypes"
import CalculateSuggestedValue from "../functions/CalculateSuggestedValue"

const initialState:any = {
        baseProducts: []
}

// console.log("Initial store state:", initialState)

const reducer = (state = initialState, action:any) =>{
    switch (action.type){
        case actionTypes.GET_PRODUCTS:
            let productsNew = action.response.map((prods:any) => ({
                ...prods,
                inTheBack: 0,
                onTheFloor: 0,
                order: 0,
                sell: 0,
                selling: 0,
                suggested: 0
              }))  
            return {
                ...state,
                baseProducts: productsNew
            };
        case actionTypes.UPDATE_INPUT:

        let productsWithInput = [...state.baseProducts];

        let prodID = action.productId;
        const property = action.event.target.name;
        const prodIndex = productsWithInput.findIndex(({ productId }) => productId === prodID);

        console.log(productsWithInput[prodIndex][property] )
            productsWithInput[prodIndex][property] = action.event.target.value;

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
            return {
                ...state,
                baseProducts: productsWithInput
            };
    
        case actionTypes.UPDATE_SELLSELLING:

        let productsWithSellSelling = [...state.baseProducts];
        productsWithSellSelling.forEach((products) => { 
        if (action.name ==="TodaysSales"){
            let sellValue = (((action.todaysSales * (products.percentSales/100))/products.retailPrice))/(products.caseSize)
            products.sell =  parseFloat(sellValue.toFixed(1))
        } else if (action.name === "SalesPrediction"){
            let sellValue = (((action.salesPrediction * (products.percentSales/100))/products.retailPrice))/(products.caseSize)
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
        return {
                ...state,
                baseProducts: productsWithSellSelling
            }
        case actionTypes.SET_TO_SUGGESTED:
            let productsWithOrderSetToSuggested = [...state.baseProducts];
             const element = action.event.target as HTMLInputElement
                
                     if (element.id === 'revert'){
                       productsWithOrderSetToSuggested.forEach((products) => {
                         products.order = 0
                       })
                     }
                    if (element.id ==='set')
                     productsWithOrderSetToSuggested.forEach((products) => {
                       if (action.roundingDirection){
                       products.order = Math.floor(products.suggested)
                       }
                       else if(!action.roundingDirection) {
                         products.order = Math.ceil(products.suggested)
                       };
                     })
                   
            return {
                    ...state,
                    baseProducts: productsWithOrderSetToSuggested
                }
        default: 
            return state;
        }
};

export default reducer;
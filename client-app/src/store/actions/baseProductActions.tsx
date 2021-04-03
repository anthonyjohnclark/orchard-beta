import * as actionTypes from "./actionTypes"
import agent from "../../api/agent"


export const saveBaseProducts = (response:any) => {
    return ({
        type: actionTypes.GET_PRODUCTS,
        response: response    })
}

export const getBaseProducts = () => {
    return (dispatch:any) => {
    return agent.Products.list().then((response) =>
     {  
         return dispatch(saveBaseProducts(response))}
  )}};

export const updateInputChanged = (productId:number,e:React.ChangeEvent<HTMLInputElement>) => {
    return ({
        type: actionTypes.UPDATE_INPUT,
        productId: productId,
        event: e
    })
}

export const updateSellSelling = (name: string, todaysSales:number, salesPrediction:number) => {     
      return ({
        type: actionTypes.UPDATE_SELLSELLING,
        name: name,
        todaysSales: todaysSales,
        salesPrediction: salesPrediction
    })
}

export const setOrderToSuggested = (roundingDirection:boolean, e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    return ({
        type: actionTypes.SET_TO_SUGGESTED,
        roundingDirection: roundingDirection,
        event:e
    })
}




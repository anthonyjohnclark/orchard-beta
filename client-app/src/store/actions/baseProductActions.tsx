import * as actionTypes from "./actionTypes"
import { IProductsWithInput } from "../../models/InvOrderModels/IProducts";
import axios from "axios";

export const saveBaseProducts = (response:any) => {
    return ({
        type: actionTypes.GET_PRODUCTS,
        response: response    })
}

export const getBaseProducts = () => {
    return (dispatch:any) => {
    return axios.get<IProductsWithInput[]>("http://localhost:5000/api/products")
    .then((response) =>
     {  
         return dispatch(saveBaseProducts(response))}
  )}};

export const updateInputChanged = (id:number,e:React.ChangeEvent<HTMLInputElement>) => {
    return ({
        type: actionTypes.UPDATE_INPUT,
        id: id,
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




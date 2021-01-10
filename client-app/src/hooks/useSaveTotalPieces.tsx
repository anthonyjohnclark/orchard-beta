import { useState, useEffect } from "react"
import { IOrderedProducts } from "../models/IProducts";

const useSaveTotalPieces = (orderedProducts: IOrderedProducts[]) => {
    
     const [totalPieces, setTotalPieces] = useState(0)
     
     const saveTotalPieces = () => {

     let initialValue = 0
     let sum = orderedProducts.reduce(
       (accumulator:any, currentValue:any) => accumulator + parseInt(currentValue.ordered)
       , initialValue
    )
     setTotalPieces(sum);
     }

    useEffect(() => {
        saveTotalPieces();
    });
     return totalPieces
     }

     export default useSaveTotalPieces;
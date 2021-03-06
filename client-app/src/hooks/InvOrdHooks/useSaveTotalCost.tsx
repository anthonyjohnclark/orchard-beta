import { useState, useEffect } from "react"
import { IOrderedProducts } from "../../models/InvOrderModels/IProducts";

const useSaveTotalCost = (orderedProducts: IOrderedProducts[]) => {
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
});

return totalCost;
}
export default useSaveTotalCost;
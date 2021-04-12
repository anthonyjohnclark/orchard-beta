import { IOrderedProducts } from "../models/InvOrderModels/IProducts";

const createPostOrderObject = (totalPieces:number,totalCost:string, orderedProducts:IOrderedProducts[]) => { 

    var date = new Date();

    //need to convert totalCost from the currency format to number 
    var totalCostAmount = parseFloat(totalCost.substr(1).replace(/,/g, ''));
    var todaysDate = date.toISOString();

    let createdOrder = {
        piecesOrdered: totalPieces,
        orderTotal: totalCostAmount,
        dateOrdered: todaysDate,
        OrderItemProducts: orderedProducts.map((op:any) =>({
            ProductId: op.productId,
            totalCost: op.totalCost,
            //this comes through as a string needs to be an int
            ordered: parseInt(op.order)
        }))
    }
 return createdOrder;   
}

export default createPostOrderObject;
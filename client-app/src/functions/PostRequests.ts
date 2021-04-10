import agent from "../api/agent"

class PostRequests {

    public static postOrder = (orderSubmitObject: any) => {

        console.log(orderSubmitObject);
         let productOrderResponse = agent.Orders.postOrder(orderSubmitObject)
         .then(response => console.log(response))
         .catch(error => console.log(error)) 
         return productOrderResponse
    }
}

export default PostRequests; 
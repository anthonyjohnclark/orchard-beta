import React, {useState, useEffect} from "react";
import Auxil from "../../hoc/Auxil";
import InvHeader from "../../components/InvOrder/InvHeader/InvHeader";
import { IProductsWithInput } from "../../models/Products";
import axios from "axios";

const InvOrder = () => {

  const [products, getProducts] = useState<IProductsWithInput[]>([])

  useEffect(() => {
    axios
    .get<IProductsWithInput[]>("http://localhost:5000/api/products")
    .then((response) => {
     //  console.log(response);
     let productsNew = response.data.map((prod) => ({
      ...prod,
      inTheBack: 0,
      onTheFloor: 0,
      order: 0,
      sell: 0,
      selling: 0,
      suggested: 0
    }))
      getProducts(productsNew)
    });}, [])


    return (
      <Auxil>
        <InvHeader products={products} />
      </Auxil>
    );
}

export default InvOrder;

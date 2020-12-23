import React, {useState, useEffect} from "react";
import Auxil from "../../hoc/Auxil";
import InvHeader from "../../components/InvOrder/InvHeader/InvHeader";
import { IProducts } from "../../models/Products";
import axios from "axios";

const InvOrder = () => {

  const [products, getProducts] = useState<IProducts[]>([])

  useEffect(() => {
    axios
    .get<IProducts[]>("http://localhost:5000/api/products")
    .then((response) => {
     //  console.log(response);
      getProducts(response.data)
    }); }, [getProducts])

    return (
      <Auxil>
        <InvHeader products={products} />
      </Auxil>
    );
}

export default InvOrder;

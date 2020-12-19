import React, { useState, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import InvOrd from "./containers/InvOrder/InvOrder";
import axios from "axios";
import {IProducts} from './models/Products'


const App = () => {

  const [products, getProducts] = useState<IProducts[]>([])

  useEffect(() => {
     axios
     .get<IProducts[]>("http://localhost:5000/api/products")
     .then((response) => {
       console.log(response);
       getProducts(response.data)
     });
  }, [])

    return (
      <div>
        <Layout>
          <InvOrd products={products} />
        </Layout>
      </div>
    );
}

export default App;

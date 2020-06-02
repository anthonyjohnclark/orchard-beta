import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import InvOrd from "./containers/InvOrder/InvOrder";
import classes from "./App.module.css";
import axios from "axios";

class App extends Component {
  state = { ProductInventory: [] };

  componentDidMount() {
    axios.get("http://localhost/5000/values").then((response) => {
      console.log(response);
      this.setState({
        ProductInventory: [
          {
            vin: response.data,
            organic: response.data,
            name: response.data,
            onSale: response.data,
            soldBy: response.data,
            caseSize: response.data,
            retailPrice: response.data,
            sold: response.data,
            shrink: response.data,
            expectedInv: response.data,
            expectedFloor: response.data,
            par: response.data,
            isActive: response.data,
          },
          {
            vin: 1202556211,
            organic: false,
            name: "Gala Apples",
            onSale: false,
            soldBy: "lb",
            caseSize: 40,
            retailPrice: 3.99,
            sold: 45,
            shrink: 10,
            expectedInv: 2,
            expectedFloor: 0.8,
            par: 2,
            isActive: true,
          },
        ],
      });
    });
  }

  render() {
    return (
      <div>
        <Layout>
          <InvOrd products={this.state.ProductInventory} />
        </Layout>
      </div>
    );
  }
}

export default App;

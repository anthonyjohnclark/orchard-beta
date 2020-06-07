import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import InvOrd from "./containers/InvOrder/InvOrder";
import classes from "./App.module.css";
import axios from "axios";

class App extends Component {
  // state = { ProductInventory: [] };
  state = { products: [] };

  componentDidMount() {
    axios.get("http://localhost:5000/api/products").then((response) => {
      console.log(response);
      this.setState({
        products: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <Layout>
          <InvOrd products={this.state.products} />
        </Layout>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import InvOrd from "./containers/InvOrder/InvOrder";
import classes from "./App.module.css";
import axios from "axios";

class App extends Component {
  // state = { ProductInventory: [] };
  state = { values: [] };

  componentDidMount() {
    axios.get("http://localhost:5000/api/values").then((response) => {
      console.log(response);
      this.setState({
        values: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <Layout>
          <InvOrd products={this.state.values} />
        </Layout>
      </div>
    );
  }
}

export default App;

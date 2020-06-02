import React, { Component } from "react";
import Auxil from "../../hoc/Auxil";
import InvProdList from "../../components/InvOrder/InvProdList/InvProdList";

class InvOrd extends Component<any, any> {
  render() {
    return (
      <Auxil>
        <h1>InvHeader</h1>
        <InvProdList products={this.props.products}></InvProdList>
        <h1>InvOrderSummary</h1>
      </Auxil>
    );
  }
}

export default InvOrd;

import React, { Component } from "react";
import Auxil from "../../hoc/Auxil";
import InvHeader from "../../components/InvOrder/InvHeader/InvHeader";

class InvOrd extends Component<any, any> {
  render() {
    return (
      <Auxil>
        <InvHeader products={this.props.products} />
      </Auxil>
    );
  }
}

export default InvOrd;

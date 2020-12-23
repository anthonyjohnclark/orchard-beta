import React from "react";
import Layout from "./components/Layout/Layout";
import InvOrder from "./containers/InvOrder/InvOrder";

const App = () => {
     return (
      <div>
        <Layout>
          <InvOrder/>
        </Layout>
      </div>
    );
}

export default App;

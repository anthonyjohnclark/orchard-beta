import React from "react";
import Layout from "./components/Layout/Layout";
import InvOrder from "./containers/InvOrder/InvOrder";
import OnTheFloor from "./containers/OnTheFloor/OnTheFloor";
import SalesShrink from "./containers/SalesShrink/SalesShrink";
import { Route, Switch } from "react-router-dom"
import LaborTasks from "./containers/LaborTasks/LaborTasks";

const App = () => {
     return (
        <Layout>
          <Switch>
          <Route path ="/onTheFloor" component ={OnTheFloor}></Route>
          <Route path ="/salesShrink" component ={SalesShrink}></Route>
          <Route path ="/laborTasks" component ={LaborTasks}></Route>
          <Route path ="/" component ={InvOrder}></Route>
          </Switch>
        </Layout>
    );
}

export default App;

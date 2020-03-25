import React from "react";

import "./sass/index.scss";

import Dashboard from "./components/Dashboard";

//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//import AddAccount from "./components/AddAccount";


/*const routes = (
  <Router>
    <Switch>
      <Route path="/add-acct" component={AddAccount} />
    </Switch>
  </Router>
)*/

export default function App() {

  return (
    <>
      
      <Dashboard />
     </>
  );
}

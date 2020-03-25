import React from "react";
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Navigation from "./components/navigation";
import Dashboard from './components/delete';

import "./sass/index.scss";

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
      <Navigation />
      <Dashboard />
    </>
  );
}

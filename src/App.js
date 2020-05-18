import React from "react";

import "./sass/index.scss";
import { Route, Switch } from "react-router";
import Login from "./components/auth/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Landing from "./components/Landing";
import Team from "./components/Team";
import HomePage from "./components/HomePage";
import Callback from "./components/Callback";
import Registration from "./components/auth/Registration";

const App = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoute path="/callback" component={Callback} />
        <PrivateRoute path="/home" component={HomePage} />
        <Route path="/team" component={Team} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/" component={Landing} />
      </Switch>
    </>
  );
};

export default App;

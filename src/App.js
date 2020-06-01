import React from "react";
import { SecureRoute, LoginCallback } from "@okta/okta-react";
import { Route, Switch } from "react-router";

import Landing from "./components/Landing";
import LoginOkta from "./components/auth/LoginOkta";
import ConnectAccounts from "./components/auth/ConnectAccounts";
import Home from "./components/Home";

import "./sass/index.scss";

const App = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route
        exact
        path="/login"
        render={(props) => (
          <LoginOkta {...props} baseUrl={process.env.REACT_APP_OKTA_DOMAIN} />
        )}
      />
      <SecureRoute path="/home" component={Home} />
      <SecureRoute path="/connect" component={ConnectAccounts} />
      <Route path="/implicit/callback" component={LoginCallback} />
    </Switch>
  );
};

export default App;

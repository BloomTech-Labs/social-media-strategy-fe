import React, { Fragment } from "react";
import { SecureRoute, LoginCallback } from "@okta/okta-react";
import { Route, Switch } from "react-router";

import Landing from "./components/Landing";
import LoginOkta from "./components/auth/LoginOkta";
import ConnectAccounts from "./components/auth/ConnectAccounts";
import Home from "./components/Home";

import CssBaseline from "@material-ui/core/CssBaseline";
import "./sass/index.scss";

const App = (props) => {
  return (
    <Fragment>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login">
          <LoginOkta baseUrl={process.env.REACT_APP_OKTA_DOMAIN} />
        </Route>
        <SecureRoute path="/home" component={Home} />
        <SecureRoute path="/connect" component={ConnectAccounts} />
        <Route path="/implicit/callback" component={LoginCallback} />
      </Switch>
    </Fragment>
  );
};

export default App;

import React from "react";

import "./sass/index.scss";
import { Route, Switch, useHistory } from "react-router";
// import Login from "./components/auth/Login";
// import PrivateRoute from "./utils/PrivateRoute";
// import Team from "./components/Team";
// import HomePage from "./components/HomePage";
// import Callback from "./components/Callback";
// import Registration from "./components/auth/Registration";
import Landing from "./components/Landing";
// new stuff
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import LoginOkta from "./components/auth/LoginOkta";
import ConnectAccounts from "./components/auth/ConnectAccounts";
import Home from "./components/Home";
import CssBaseline from "@material-ui/core/CssBaseline";

const config = {
  issuer: `${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: window.location.origin + "/implicit/callback",
  scopes: ["openid", "profile", "email"],
};

const App = (props) => {
  const { push } = useHistory();

  return (
    <Security {...config} onAuthRequired={() => push("/login")}>
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
    </Security>
  );
};

export default App;

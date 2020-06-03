import React, { useEffect } from "react";
import { SecureRoute, LoginCallback } from "@okta/okta-react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";

import { initializeUser } from "./actions/userActions";

import Landing from "./components/pages/Landing";
import LoginOkta from "./components/auth/LoginOkta";
import ConnectAccounts from "./components/auth/ConnectAccounts";
import Home from "./components/pages/Home";

import "./sass/index.scss";

function App(props) {
  const { authService } = useOktaAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("App.js useEffect fired", Date.now());
    console.log(location);
    if (location.pathname === "/connect/twitter/callback") return;
    if (!user.initialized) {
      dispatch(initializeUser(authService, history));
      return;
    }
    // eslint-disable-next-line
  }, [user, location]);

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={LoginOkta} />
      <SecureRoute path="/home" component={Home} />
      <SecureRoute path="/connect" component={ConnectAccounts} />
      <Route path="/implicit/callback" component={LoginCallback} />
    </Switch>
  );
}

export default App;

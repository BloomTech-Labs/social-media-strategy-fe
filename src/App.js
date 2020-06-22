import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { SecureRoute, LoginCallback } from "@okta/okta-react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";

import { initializeUser } from "./actions/userActions";

import LoginOkta from "./components/auth/LoginOkta";
import ConnectAccounts from "./components/auth/ConnectAccounts";
import Home from "./components/pages/Home";
import Analytics from "./components/pages/Analytics";
import NavMenuTemplate from "./components/templates/NavMenuTemplate";

function initializeAnalytics() {
  ReactGA.initialize("UA-169685720-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

function App(props) {
  initializeAnalytics();
  const { authService } = useOktaAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (location.pathname === "/connect/twitter/callback") return;
    if (!user.initialized) {
      dispatch(initializeUser(authService, history));
      return;
    }
    // eslint-disable-next-line
  }, [user, location]);

  return (
    <Switch>
      <Route exact path="/login" component={LoginOkta} />
      <Route path="/implicit/callback" component={LoginCallback} />
      <Route>
        <NavMenuTemplate>
          <SecureRoute path="/home" component={Home} />
          <SecureRoute path="/analytics" component={Analytics} />
          <SecureRoute path="/connect" component={ConnectAccounts} />
        </NavMenuTemplate>
      </Route>
    </Switch>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Security } from "@okta/okta-react";

import App from "./App";
import Landing from "./components/pages/Landing";

const oktaConfig = {
  issuer: `${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: window.location.origin + "/implicit/callback",
  scopes: ["openid", "profile", "email"],
};

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Security
          {...oktaConfig}
          onAuthRequired={() => {
            if (window.location.pathname !== "/login") {
              window.location.pathname = "/login";
            }
          }}
        >
          <App />
        </Security>
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;

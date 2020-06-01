import React from "react";
import ReactDOM from "react-dom";
import { Security } from "@okta/okta-react";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import App from "./App";

// imports for redux setup
import { reducer } from "./reducers";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./muiCustomTheme";
import "./index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

const oktaConfig = {
  issuer: `${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: window.location.origin + "/implicit/callback",
  scopes: ["openid", "profile", "email"],
};

ReactDOM.render(
  <Security
    {...oktaConfig}
    onAuthRequired={() => (window.location.href = "/login")}
  >
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </Security>,
  document.getElementById("root")
);

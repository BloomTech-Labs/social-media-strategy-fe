import React from "react";
import { Route } from "react-router-dom";
import TwitterConnect from "./TwitterConnect";
import TwitterConnectCallback from "./TwitterConnectCallback";

function ConnectAccounts(props) {
  return (
    <>
      <main>
        <h1>ConnectAccounts</h1>
        <Route exact path="/connect/twitter" component={TwitterConnect} />
        <Route
          exact
          path="/connect/twitter/callback"
          component={TwitterConnectCallback}
        />
      </main>
    </>
  );
}

export default ConnectAccounts;

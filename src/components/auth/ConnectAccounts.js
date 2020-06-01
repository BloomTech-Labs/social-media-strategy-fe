import React, { memo } from "react";
import { Route } from "react-router-dom";
import TwitterConnect from "./TwitterConnect";
import TwitterConnectCallback from "./TwitterConnectCallback";

function ConnectAccounts(props) {
  return (
    <main>
      <Route exact path="/connect/twitter" component={TwitterConnect} />
      <Route
        path="/connect/twitter/callback"
        component={TwitterConnectCallback}
      />
    </main>
  );
}

export default memo(ConnectAccounts);

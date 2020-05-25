import React from "react";
import { Route } from "react-router-dom";
import TwitterConnect from "./TwitterConnect";

function ConnectAccounts(props) {
  return (
    <>
      <main>
        <h1>ConnectAccounts</h1>
        <Route exact path="/connect/twitter" component={TwitterConnect} />
      </main>
    </>
  );
}

export default ConnectAccounts;

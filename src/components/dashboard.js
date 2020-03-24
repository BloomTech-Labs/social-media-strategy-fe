import React from "react";
import { Route, Switch, Link } from 'react-router-dom';
import "../index.css";
import AccountList from "./AccountList";
import AddAccount from "./AddAccount";
export default function Dashboard() {
  return (
      <header>
      <div className="App">
      <div className="title">
      <h1 className="bold">Dashboard</h1>
      <div className="dash-title">
      <h4 className="highlight">Tuesday</h4> <h4 className="highlight"> ▪ </h4><h4> 16 March, 2020</h4>
      </div>
      <div className="acct-title">
      <h2 className="blue-bold">Accounts</h2>
      <Switch>
        <Route path="/add-acct" component={AddAccount} />
      </Switch>
      <Link className="button" to={{
        pathname:'/add-acct',
        state: {modal: true },
        }}>Add Account</Link>
      </div>
      <AccountList list={AccountList}/>
      </div>
    </div>
      </header>
  );
}
import React from 'react';

import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';

import './sass/index.scss';
import { Route, Switch } from 'react-router';
import REGISTER_LOGIN from './components/Register_Login';

//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

/*const routes = (
  <Router>
    <Switch>
      <Route path="/add-acct" component={AddAccount} />
    </Switch>
  </Router>
)*/

export default function App() {
  return (
    <div className='container'>
      <Switch>
        <Route exact path='/'>
          <div className='nav'>
            <Navigation />
          </div>
          <div className='dash'>
            <Dashboard />
          </div>
          <Route path='/home/login'>
            <REGISTER_LOGIN />
          </Route>
        </Route>
      </Switch>
    </div>
  );
}

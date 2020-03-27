import React from 'react';

import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';

import './sass/index.scss';
import { Route, Switch } from 'react-router';
import REGISTER_LOGIN from './components/Register_Login';
import Callback from './components/Callback';

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
      <Route exact path='/callback'>
        <Callback />
      </Route>
      <Switch>
        <Route path='/login'>
          <REGISTER_LOGIN />
        </Route>
        <Route exact path='/'>
          <div className='nav'>
            <Navigation />
          </div>
          <div className='dash'>
            <Dashboard />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

import React from 'react';

import './sass/index.scss';
import { Route, Switch } from 'react-router';
import REGISTER_LOGIN from './components/Register_Login';
import PrivateRoute from './utils/PrivateRoute';
import Landing from './components/Landing';
import Team from './components/Team';
import HomePage from './components/HomePage';
import Callback from './components/Callback';

const App = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoute path='/callback' component={Callback} />
        <Route path='/landing' component={Landing} />
        <Route path='/team' component={Team} />
        <Route path='/login'>
          <REGISTER_LOGIN />
        </Route>
        <PrivateRoute path='/' component={HomePage} />
      </Switch>
    </>
  );
};

export default App;

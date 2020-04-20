import React, { useCallback, useState } from 'react';

import './sass/index.scss';
import { Route, Switch } from 'react-router';
import REGISTER_LOGIN from './components/Register_Login';
import PrivateRoute from './utils/PrivateRoute';
import { axiosWithAuth } from './utils/axiosWithAuth';
import HomePage from './components/HomePage';

const App = (props) => {
  return (
    <>
      <Switch>
        <Route path="/login">
          <REGISTER_LOGIN />
        </Route>
        <PrivateRoute path="/" component={HomePage} />
      </Switch>
    </>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { _home, _login, _signup, _dashboard, _manage } from './config/path';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AuthProvider from './context/context';

import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Manage from './pages/manage';
import Dashboard from './pages/dashboard.js';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path={_home} component={Home} />
          <PublicRoute path={_login} component={Login} />
          <PublicRoute path={_signup} component={SignUp} />
          <PrivateRoute path={_dashboard} component={Dashboard} />
          <PrivateRoute path={_manage} component={Manage} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

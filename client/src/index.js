import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';


import Home from './pages/home'
import Login from './pages/login'
import SignUp from './pages/signup'

const App = () => {
  return (
    <BrowserRouter>
    <Route exact path='/' component={Home}/>
    <Route path='/login' component={Login}/>
    <Route path='/signup' component={SignUp}/>

    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


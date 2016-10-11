import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from '../../client/components/App.jsx';
import SearchTest from '../../client/components/SearchTest.jsx';
import Main from '../components/Main.jsx';
import SignUp from '../components/SignUp.jsx';
import Login from '../components/Login.jsx';

const Routes = () => (
  <Router history={hashHistory} >
    <Route path="/" component={App} />
      <Route path="signUp" component={SignUp} />
      <Route path="login" component={Login} />
    <Route path="/search-test" component={SearchTest} />
  </Router>
);

export default Routes;

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from '../../client/components/App.jsx';
import SearchTest from '../../client/components/SearchTest.jsx';
import Main from '../components/Main.jsx';
import UserForm from '../users/UserForm.jsx';
import SignUp from '../components/SignUp.jsx';
import Login from '../components/Login.jsx';

const Routes = () => (
  <Router history={hashHistory} >
    <Route path="/" component={App} >
      <IndexRoute component={SearchTest}/>
      <Route path="signup" component={UserForm} />
      <Route path="login" component={UserForm} />
    </Route>
    <Route path="/search-test" component={SearchTest} />
  </Router>
);

export default Routes;

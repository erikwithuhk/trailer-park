import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from '../../client/components/App.jsx';
import SearchTest from '../../client/components/SearchTest.jsx';
import UserForm from '../users/UserForm.jsx';
import UserProfile from '../components/UserProfile.jsx';

const Routes = () => (
  <Router history={hashHistory} >
    <Route path="/" component={App} >
      <IndexRoute component={SearchTest}/>
      <Route path="signup" component={UserForm} />
      <Route path="login" component={UserForm} />
      <Route path="profile" component={UserProfile} />
    </Route>
    <Route path="/search-test" component={SearchTest} />
  </Router>
);

export default Routes;

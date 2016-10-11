import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from '../../client/components/App.jsx';
import SearchTest from '../../client/components/SearchTest.jsx';
import UserProfile from '../components/UserProfile.jsx';

const Routes = () => (
  <Router history={hashHistory} >
    <Route path="/" component={App} />
    <Route path="/search-test" component={SearchTest} />
    <Route path="/profile" component={UserProfile} />
  </Router>
);

export default Routes;

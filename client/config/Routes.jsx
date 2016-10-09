import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from '../components/App.jsx';

const Routes = () => (
  <Router history={hashHistory} >
    <Route path="/" component={App} />
  </Router>
);

export default Routes;

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from '../../client/components/App.jsx';
import Search from '../../client/components/Search.jsx';
import UserForm from '../components/users/UserForm.jsx';
import UserProfile from '../components/UserProfile.jsx';
import TrailerCarousel from '../components/TrailerCarousel.jsx';
import Community from '../components/Community.jsx';


const Routes = () => (
  <Router history={hashHistory} >
    <Route path="/" component={App} >
      <IndexRoute component={Search} />
      <Route path="signup" component={UserForm} />
      <Route path="login" component={UserForm} />
      <Route path="profile" component={UserProfile} />
      <Route path="carousel" component={TrailerCarousel} />
      <Route path="community" component={Community} />
      <Route path="search" component={Search} />
    </Route>
  </Router>
);

export default Routes;

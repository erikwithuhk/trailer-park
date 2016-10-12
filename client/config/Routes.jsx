import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from '../../client/components/App.jsx';
import SearchTest from '../../client/components/SearchTest.jsx';
import UserProfile from '../components/UserProfile.jsx';
import UserForm from '../components/users/UserForm.jsx';
import MovieCarousel from '../components/MovieCarousel.jsx';


const Routes = () => (
  <Router history={hashHistory} >
    <Route path="/" component={App} >
      <IndexRoute component={SearchTest} />
      <Route path="signup" component={UserForm} />
      <Route path="login" component={UserForm} />
      <Route path="profile" component={UserProfile} />
      <Route path="carousel" component={MovieCarousel} />
    </Route>
    <Route path="/search-test" component={SearchTest} />
  </Router>
);

export default Routes;

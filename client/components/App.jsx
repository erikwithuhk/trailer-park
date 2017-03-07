import React, { Component } from 'react';
import { hashHistory, withRouter, Link } from 'react-router';
import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';
import request from 'superagent';

import Nav from './Nav.jsx';

const propTypes = {
  children: React.PropTypes.element,
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {
        id: null,
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        bio: '',
        trailers: [],
      },
    };
    this.fetchTrailers = this.fetchTrailers.bind(this);
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount() {
    this.updateAuth();
  }
  getCurrentUser(token) {
    const decoded = jwtDecode(token);
    const { id, email, username, firstName, lastName, bio } = decoded;
    const currentUser = { id, email, username, firstName, lastName, bio, trailers: [] };
    this.setState({ currentUser }, this.fetchTrailers);
  }
  fetchTrailers() {
    const { id } = this.state.currentUser;
    request.get(`/api/users/${id}/trailers`)
           .then((response) => {
             const trailers = response.body;
             const currentUser = { ...this.state.currentUser, trailers };
             this.setState({ currentUser });
           })
           .catch(err => console.error(err));
  }
  updateAuth() {
    const token = cookie.load('token');
    if (token) {
      return this.getCurrentUser(token);
    }
    const currentUser = {
      id: null,
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      bio: '',
      trailers: [],
    };
    return this.setState({ currentUser });
  }
  signUp(userDetails) {
    request.post('/api/signup')
           .send(userDetails)
           .then(() => {
             this.updateAuth();
             hashHistory.push('/profile');
           })
           .catch(err => console.error(err));
  }
  logIn(userDetails) {
    request.post('/api/login')
           .send(userDetails)
           .then(() => {
             this.updateAuth();
             hashHistory.push('/profile');
           })
           .catch(err => console.error(err));
  }
  updateUser({ id, email, username, firstName, lastName, bio, trailers }) {
    const userDetails = { email, username, firstName, lastName, bio, trailers };
    request.patch(`/api/users/${id}`)
           .send(userDetails)
           .then((response) => {
             const currentUser = response.body;
             this.setState({ currentUser });
           })
           .catch(err => console.error(err));
  }
  signOut() {
    request.post('/api/signout')
           .then(() => {
             this.updateAuth();
             hashHistory.push('/');
           })
           .catch(err => console.error(err));
  }
  render() {
    const childrenWithProps = React.cloneElement(this.props.children, {
      currentUser: this.state.currentUser,
      fetchTrailers: this.fetchTrailers,
      logIn: this.logIn,
      signUp: this.signUp,
      signOut: this.signOut,
      updateUser: this.updateUser,
    });
    return (
      <div>
        <Nav currentUser={this.state.currentUser} signOut={this.signOut} />
        {childrenWithProps}
        <footer>&copy;2016 Erik J&ouml;nsson, Annie Burns, and Lynn Fleck</footer>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default withRouter(App);

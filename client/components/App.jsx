import React, { Component } from 'react';
import { hashHistory, withRouter, Link } from 'react-router';
import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';
import request from 'superagent';

const propTypes = {
  children: React.PropTypes.element,
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount() {
    this.updateAuth();
  }
  createUserDisplayElement() {
    if (this.state.currentUser) {
      return (
        <div className="top-nav_links">
          <Link to="/search" >Search</Link>
          <Link to="/community" >Community</Link>
          <Link to="/profile" className="profile" >Profile</Link>
          <Link to="#" onClick={this.signOut} >Sign out</Link>
        </div>
        );
    }
    return (
      <div className="top-nav_links">
        <Link to="/signup" className="signup" >Sign up</Link>
        <Link to="/login" className="login" >Login</Link>
      </div>
    );
  }
  getCurrentUser(token) {
    const decoded = jwtDecode(token);
    const { id, email, username, firstName, lastName, bio, trailers } = decoded;
    const currentUser = { id, email, username, firstName, lastName, bio, trailers };
    this.setState({ currentUser });
  }
  updateAuth() {
    const token = cookie.load('token');
    if (token) {
      return this.getCurrentUser(token);
    }
    return this.setState({ currentUser: null });
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
    const userDisplayElement = this.createUserDisplayElement();
    const childrenWithProps = React.cloneElement(this.props.children, {
      currentUser: this.state.currentUser,
      handleLogin: this.logIn,
      handleSignup: this.signUp,
      handleSignout: this.signOut,
      updateUser: this.updateUser,
    });
    return (
      <div>
        <div className="top-nav clearfix">
          <Link to="/">
            <img
              className="trailericon"
              src="./images/TrailerParkLogo_main.png"
              alt="trailerparklogo"
            />
          </Link>
          {userDisplayElement}
        </div>
        {childrenWithProps}
        <footer>&copy;2016 Erik J&ouml;nsson, Annie Burns, and Lynn Fleck</footer>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default withRouter(App);

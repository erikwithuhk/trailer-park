import React, { Component } from 'react';
import { hashHistory, withRouter, Link } from 'react-router';
import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';
import request from 'superagent';

const propTypes = {
  children: React.PropTypes.element,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      token: null,
    };
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
    const currentUser = { id, email, username, firstName, lastName, bio };
    this.setState({ currentUser });
  }
  updateAuth() {
    const token = cookie.load('token');
    if (token) {
      this.getCurrentUser(token);
    }
    this.setState({ token });
  }
  signUp(userDetails) {
    request.post('/api/signup')
           .send(userDetails)
           .then(() => {
             this.updateAuth();
             hashHistory.push('/profile');
           })
           .catch(err => console.error(err));
          //  TODO handle signup error
  }
  logIn(userDetails) {
    request.post('/api/login')
           .send(userDetails)
           .then(() => {
             this.updateAuth();
             hashHistory.push('/profile');
           })
           .catch(err => console.error(err));
          //  TODO handle login error
  }
  updateUser({ id, email, username, firstName, lastName, bio }) {
    const userDetails = { email, username, firstName, lastName, bio };
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
    let userDisplayElement;
    if (this.state.token) {
      userDisplayElement = (
        <div className="top-nav_links">
          <Link to="/search" >Search</Link>
          <Link to="/community" >Community</Link>
          <Link to="/profile" className="profile" >Profile</Link>
          <Link to="#" onClick={this.signOut} >Sign out</Link>
        </div>
        );
    } else {
      userDisplayElement = (
        <div className="top-nav_links">
          <Link to="/signup" className="signup" >Sign up</Link>
          <Link to="/login" className="login" >Login</Link>
        </div>
      );
    }
    const childrenWithProps = React.cloneElement(this.props.children, {
      currentUser: this.state.currentUser,
      token: this.state.token,
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

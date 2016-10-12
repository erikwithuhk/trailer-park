import React, { Component } from 'react';
import { hashHistory, withRouter, Link } from 'react-router';
import request from 'superagent';
import cookie from 'react-cookie';

const propTypes = {
  children: React.PropTypes.element,
  currentUser: React.PropTypes.object,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      currentUser: {},
    };
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  componentDidMount() {
    this.updateAuth();
  }
  signOut() {
    request.post('/api/signout')
           .then(() => this.updateAuth());
           hashHistory.push('/');
  }
  updateAuth(currentUser) {
    this.setState({
      token: cookie.load('token'),
      currentUser,
    });
  }
  logIn(userDetails) {
    request.post('/api/login')
           .send(userDetails)
           .then((currentUserData) => {
             const currentUser = currentUserData.body;
             this.updateAuth(currentUser);
             hashHistory.push('/profile');
           });
  }
  signUp(userDetails) {
    request.post('/api/signup')
           .send(userDetails)
           .then((currentUserData) => {
             const currentUser = currentUserData.body;
             this.updateAuth(currentUser);
             hashHistory.push('/profile');
           });
  }
  render() {
    let userDisplayElement;
    if (this.state.token) {
      userDisplayElement = (
        <div>
          <button onClick={this.signOut} >Logout</button>
          <Link to="/profile" id="profile"><button>Go to my Profile</button></Link>
        </div>
        );
    } else {
      userDisplayElement = (
        <div>
          <Link to="/login" id="login"><button>Login</button></Link>
          <Link to="/signup" id="signup"><button>Sign Up</button></Link>
        </div>
      );
    }
    const childrenWithProps = React.cloneElement(this.props.children, {
      currentUser: this.state.currentUser,
      handleLogin: this.logIn,
      handleSignup: this.signUp,
      handleSignout: this.signOut,
    });
    return (
      <div>
        {userDisplayElement}
        <h1>
          <div id="trailericon">
            <img src="trailerparklogo.png" alt="trailerparklogo" />
          </div>
        </h1>
        <h2>This is the Trailer Park App Component</h2>
        {childrenWithProps}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default withRouter(App);

import React, { Component } from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import UserForm from '../users/UserForm.jsx';

const propTypes = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      user: {},
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
  }
  updateAuth(user) {
    this.setState({
      token: cookie.load('token'),
      user,
    });
  }
  logIn(userDetails) {
    request.post('/api/login')
           .send(userDetails)
           .then((currentUserData) => {
             const currentUser = currentUserData.body;
             this.updateAuth(currentUser);
           });
  }
  signUp(userDetails) {
    request.post('/api/signup')
           .send(userDetails)
           .then((currentUserData) => {
             const currentUser = currentUserData.body;
             this.updateAuth(currentUser);
           });
  }
  render() {
    let userDisplayElement;
    if (this.state.token) {
      userDisplayElement = (
        <div>
          <button onClick={this.signOut} >Logout</button>
        </div>
        );
    } else {
      userDisplayElement = (
        <div>
          <h1>This is the signUp form</h1>
          <UserForm handleSubmit={this.signUp} buttonText="Sign Up" />
          <h1>This is the logIn form</h1>
          <UserForm handleSubmit={this.logIn} buttonText="Log In" />
        </div>
      );
    }
    return (
      <div>
        <h1>This is the Trailer Park App Component</h1>
        {userDisplayElement}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;

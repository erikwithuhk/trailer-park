import React, { Component } from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import UserForm from '../users/UserForm.jsx';

const propTypes = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { token: null }
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
  updateAuth() {
    this.setState({
      token: cookie.load('token'),
    });
  }
  logIn(userDetails) {
    request.post('/api/login')
           .send(userDetails)
           .then(() => {
             this.updateAuth();
           });
  }
  signUp(userDetails) {
    request.post('/api/signup')
           .send(userDetails)
           .then(() => {
             this.updateAuth();
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
          <h3>This is the signUp form</h3>
          <UserForm handleSubmit={this.signUp} buttonText="Sign Up" />
          <h3>This is the logIn form</h3>
          <UserForm handleSubmit={this.logIn} buttonText="Log In" />
        </div>
      );
    }
    return (
      <div>
        <h2>This is the Trailer Park App Component</h2>
        {userDisplayElement}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;

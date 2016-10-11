import React, { Component } from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import UserForm from '../users/UserForm.jsx';

const propTypes = {};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { token: null }
    this.signUp = this.signUp.bind(this);
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
          <h2>This is the signUp form</h2>
          <UserForm handleSubmit={this.signUp} buttonText="Sign Up" />
        </div>
      );
    }
    return (
      <div>
        <h1>This is the Trailer Park SignUp Component</h1>
        {userDisplayElement}
      </div>
    );
  }
}

SignUp.propTypes = propTypes;

export default SignUp;

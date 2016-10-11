import React, { Component } from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import cookie from 'react-cookie';
import UserForm from '../users/UserForm.jsx';

const propTypes = {};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { token: null }
    this.logIn = this.logIn.bind(this);
  }
  componentDidMount() {
    this.updateAuth();
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

          <h3>This is the logIn form</h3>
          <UserForm handleSubmit={this.logIn} buttonText="Log In" />
        </div>
      );
    }
    return (
      <div>
        <h2>This is the Trailer Park Login Component</h2>
        {userDisplayElement}
      </div>
    );
  }
}

Login.propTypes = propTypes;

export default Login;

import React, { Component } from 'react';
import request from 'superagent';
import UserForm from '../users/UserForm.jsx';

const propTypes = {
  handleSubmit: React.PropTypes.func,
  handleInputChange: React.PropTypes.func,
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      username: '',
      first_name: '',
      last_name: '',
      bio: '',
      password: '',
    };
  }
  componentDidMount() {
    this.getUserEmail();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>My Profile</h1>
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            placeholder="User Name"
          />
          <input
            type="text" name="first_name"
            onChange={this.handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            placeholder="Last Name"
          />
          <input
            type="text"
            name="bio"
            onChange={this.handleChange}
            placeholder="My Bio"
          />
          <input
            type="submit"
            value="Update"
          />
        </form>
        <button onClick={this.signOut}>Logout</button>
      </div>
    );
  }
}

UserProfile.propTypes = propTypes;

export default UserProfile;

import React, { Component } from 'react';

const propTypes = {
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
  getUserEmail() {
    this.setState({ email: 'email goes here' });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>My Profile {this.state.email} </h1>
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

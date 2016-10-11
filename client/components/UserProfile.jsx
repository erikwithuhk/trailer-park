import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';
import request from 'superagent';
import cookie from 'react-cookie';

const propTypes = {
  currentUser: React.PropTypes.object,
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.currentUser.email || '',
      username: '',
      first_name: '',
      last_name: '',
      bio: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  componentDidMount() {
  }
  handleChange(e) {
    const target = e.target;
    const name = target.getAttribute('name');
    const value = target.value;
    const updated = {};
    updated[name] = value;
    this.setState(updated);
  }
  handleSubmit(e) {
    e.preventDefault();
    // >>>> TODO need to submit to the users profile
  }
  getUserEmail() {
    // this.setState({ email: this.props.currentUser.email });
  }

  handleDeleteUser() {
    request.del('/api/profile')
  };

  handleDeleteClick(e) {
    e.preventDefault();
    this.handleDeleteUser(e.target.value);
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
            value={this.state.email}
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
          <input
            type="submit"
            value="Delete"
            onClick={this.handleDeleteClick}
          />
        </form>
        <button onClick={this.signOut}>Logout</button>
      </div>
    );
  }
}

UserProfile.propTypes = propTypes;

export default UserProfile;


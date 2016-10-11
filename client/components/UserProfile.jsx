import React, { Component } from 'react';
import request from 'superagent';

const propTypes = {
  handleSubmit: React.PropTypes.func,
  handleInputChange: React.PropTypes.func,
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
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state);
  }
  componentDidMount() {
    // SUPERAGENT req to /api/users/:id
    // need to grab user login info
    // set state with logged in user's
    this.setState({
      email: 'grab the logged in user email',
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>My Profile</h1>
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          <input type="text" onChange={this.handleChange} placeholder="User Name" />
          <input type="text" name="first_name" placeholder="First Name" />
          <input type="text" name="lastName" placeholder="Last Name" />
          <input type="text" name="bio" placeholder="My Bio" />
          <input type="submit" value="Update" />
        </form>
        <button onClick={this.signOut} >Logout</button>
      </div>
    );
  }
}

UserProfile.propTypes = propTypes;

export default UserProfile;

import React, { Component } from 'react';
import { hashHistory, withRouter } from 'react-router';
import request from 'superagent';
import TrailerCarousel from './trailers/TrailerCarousel.jsx';

const propTypes = {
  currentUser: React.PropTypes.object,
  handleSignout: React.PropTypes.func,
  updateUser: React.PropTypes.func,
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps;
    this.setState({ currentUser });
  }
  handleChange(e) {
    const { currentUser } = this.state;
    const target = e.target;
    const key = target.getAttribute('name');
    const value = target.value;
    currentUser[key] = value;
    this.setState({ currentUser });
  }
  handleUpdate(e) {
    e.preventDefault();
    this.props.updateUser(this.state.currentUser);
  }
  handleDelete(e) {
    e.preventDefault();
    request.del(`/api/users/${this.state.id}`)
           .then(() => {
             this.props.handleSignout();
             hashHistory.push('/');
           });
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div className="profile-container">
        <TrailerCarousel
          header="Your Trailers"
          trailers={this.props.currentUser.trailers}
          userID={this.props.currentUser.id}
        />
        <form onSubmit={this.handleSubmit}>
          <h1>My Profile</h1>
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            placeholder="email"
            value={currentUser.email}
          />
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            placeholder="Username"
            value={currentUser.username}
          />
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
            placeholder="First Name"
            value={currentUser.firstName}
          />
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            placeholder="Last Name"
            value={currentUser.lastName}
          />
          <input
            type="text"
            name="bio"
            onChange={this.handleChange}
            placeholder="My Bio"
            value={currentUser.bio}
          />
          <input
            type="submit"
            value="Update"
            onClick={this.handleUpdate}
          />
          <input
            type="submit"
            value="Delete"
            onClick={this.handleDelete}
          />
        </form>
      </div>
    );
  }
}

UserProfile.propTypes = propTypes;

export default withRouter(UserProfile);

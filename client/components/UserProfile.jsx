import React, { Component } from 'react';
import { hashHistory, withRouter } from 'react-router';
import request from 'superagent';
import TrailerCarousel from './trailers/TrailerCarousel.jsx';

const propTypes = {
  currentUser: React.PropTypes.object,
  signOut: React.PropTypes.func,
  updateUser: React.PropTypes.func,
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps;
    this.setState({ currentUser });
  }
  handleInputChange(e) {
    const { currentUser } = this.state;
    const target = e.target;
    const key = target.getAttribute('name');
    const value = target.value;
    currentUser[key] = value;
    this.setState({ currentUser });
  }
  handleUpdateUser(e) {
    e.preventDefault();
    this.props.updateUser(this.state.currentUser);
  }
  deleteUser(e) {
    e.preventDefault();
    request.del(`/api/users/${this.props.currentUser.id}`)
           .then(() => {
             this.props.signOut();
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
            onChange={this.handleInputChange}
            placeholder="email"
            value={currentUser.email}
          />
          <input
            type="text"
            name="username"
            onChange={this.handleInputChange}
            placeholder="Username"
            value={currentUser.username}
          />
          <input
            type="text"
            name="firstName"
            onChange={this.handleInputChange}
            placeholder="First Name"
            value={currentUser.firstName}
          />
          <input
            type="text"
            name="lastName"
            onChange={this.handleInputChange}
            placeholder="Last Name"
            value={currentUser.lastName}
          />
          <input
            type="text"
            name="bio"
            onChange={this.handleInputChange}
            placeholder="My Bio"
            value={currentUser.bio}
          />
          <input
            type="submit"
            value="Update"
            onClick={this.handleUpdateUser}
          />
          <input
            type="submit"
            value="Delete"
            onClick={this.deleteUser}
          />
        </form>
      </div>
    );
  }
}

UserProfile.propTypes = propTypes;

export default withRouter(UserProfile);

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
      id: '',
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      bio: '',
      trailers: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    if (this.props.currentUser) {
      this.setCurrentUser(this.props.currentUser);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setCurrentUser(nextProps.currentUser);
  }
  setCurrentUser(currentUser) {
    const { id, email, username, firstName, lastName, bio, trailers } = currentUser;
    this.setState({ id, email, username, firstName, lastName, bio, trailers });
  }
  handleChange(e) {
    const target = e.target;
    const stateObject = {};
    const stateKey = target.getAttribute('name');
    const stateValue = target.value;
    stateObject[stateKey] = stateValue;
    this.setState(stateObject);
  }
  handleUpdate(e) {
    e.preventDefault();
    const { id, email, username, firstName, lastName, bio } = this.state;
    this.props.updateUser({ id, email, username, firstName, lastName, bio });
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
    return (
      <div className="profile-container">
        <TrailerCarousel
          header="Your Trailers"
          trailers={this.state.trailers}
          userID={this.props.currentUser ? this.props.currentUser.id : null}
        />
        <form onSubmit={this.handleSubmit}>
          <h1>My Profile</h1>
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            placeholder="email"
            value={this.state.email}
          />
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            placeholder="Username"
            value={this.state.username}
          />
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
            placeholder="First Name"
            value={this.state.firstName}
          />
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            placeholder="Last Name"
            value={this.state.lastName}
          />
          <input
            type="text"
            name="bio"
            onChange={this.handleChange}
            placeholder="My Bio"
            value={this.state.bio}
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

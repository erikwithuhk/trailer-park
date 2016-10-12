import React, { Component } from 'react';
import { hashHistory, withRouter } from 'react-router';
import request from 'superagent';
import MovieCarousel from './MovieCarousel.jsx';

const propTypes = {
  currentUser: React.PropTypes.object,
  handleSignout: React.PropTypes.func,
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.currentUser.email || '',
      username: this.props.currentUser.username || '',
      firstName: this.props.currentUser.firstName || '',
      lastName: this.props.currentUser.lastName || '',
      bio: this.props.currentUser.bio || '',
      password: this.props.currentUser.password || '',
      trailers: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }
  componentDidMount() {
    this.getTrailers();
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
 handleUpdateProfile() {
    request.patch(`/api/users/${this.props.currentUser.id}`)
           .send(this.state)
           .then((response) => {
            const updated = response.body;
              console.log(updated);
             this.setState(updated);
      });
  }
  handleUpdateClick(e) {
    e.preventDefault();
    this.handleUpdateProfile();
  }
  handleDeleteUser() {
    request.del(`/api/users/${this.props.currentUser.id}`)
           .then(() => {
             this.props.handleSignout();
             // TODO handle signout
             hashHistory.push('/');
           });
  }
  handleDeleteClick(e) {
    e.preventDefault();
    this.handleDeleteUser();
  }
  getTrailers() {
    request.get(`/api/users/${this.props.currentUser.id}/trailers`)
           .then((response) => {
             const trailers = response.body;
             this.setState({ trailers });
           })
           .catch(err => err);
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
            onClick={this.handleUpdateClick}
          />
          <input
            type="submit"
            value="Delete"
            onClick={this.handleDeleteClick}
          />
        </form>
        <MovieCarousel trailers={this.state.trailers} />
      </div>
    );
  }
}

UserProfile.propTypes = propTypes;

export default withRouter(UserProfile);

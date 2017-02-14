import React, { Component } from 'react';
import { hashHistory, withRouter } from 'react-router';
import request from 'superagent';
import jwtDecode from 'jwt-decode';
import TrailerCarousel from './TrailerCarousel.jsx';

const propTypes = {
  token: React.PropTypes.string,
  handleSignout: React.PropTypes.func,
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
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  // componentDidMount() {
  //   this.getCurrentUser(this.props.token);
  // }
  // componentWillReceiveProps(nextProps) {
    // this.getCurrentUser(nextProps.token);
  // }
  // getCurrentUser(token) {
  //   if (token) {
  //     const decoded = jwtDecode(token);
  //     const { id } = decoded;
  //     this.getTrailers(id);
  //     this.setState({
  //       id,
  //       email: decoded.email,
  //       username: decoded.username,
  //       firstName: decoded.firstName,
  //       lastName: decoded.lastName,
  //       bio: decoded.bio,
  //     });
  //   }
  // }
  getTrailers(id) {
    if (id) {
      const url = `/api/users/${id}/trailers`;
      request.get(url)
      .then((response) => {
        const trailers = response.body;
        this.setState({ trailers });
      })
      .catch(err => err);
    }
  }
  handleChange(e) {
    const target = e.target;
    const name = target.getAttribute('name');
    const value = target.value;
    const updated = {};
    updated[name] = value;
    this.setState(updated);
  }
  handleUpdate(e) {
    e.preventDefault();
    request.patch(`/api/users/${this.state.id}`)
           .send(this.state)
           .then((response) => {
             const updated = response.body;
             this.setState(updated);
           });
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
          userID={`${this.state.id}`}
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

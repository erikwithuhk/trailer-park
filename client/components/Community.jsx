import { hashHistory, withRouter } from 'react-router';
import React, { Component } from 'react';
import request from 'superagent';
import MovieCarousel from './MovieCarousel.jsx';

class Community extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      trailers: [],
    };
  }
 componentDidMount() {
    this.getUsers();
  }
  getUsers() {
    request.get('/api/users')
    .then((response) => {
      const users = response.body;
      this.setState({ users });
    });
  }
   getTrailers() {
    const url = `/api/users/${this.state.users}/trailers`;
    console.log(url);
    request.get(url)
    .then((response) => {
      const trailers = response.body;
      this.setState({ trailers });
    })
    .catch(err => err);
  }

render() {
const usernames = this.state.users.map((user, idx) => {
  return(
    <div key={user.id} >
      <li >{user.username}</li>
      <MovieCarousel trailers={this.state.trailers[idx]} />
    </div>
    );
});
  return (
    <div>
      <ul>{usernames}</ul>
    </div>
  );
 }
};

export default withRouter(Community);

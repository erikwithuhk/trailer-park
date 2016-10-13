import React, { Component } from 'react';
import request from 'superagent';
import TrailerCarousel from './TrailerCarousel.jsx';

class Community extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
    this.getTrailers = this.getTrailers.bind(this);
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
    request.get('/api/users')
    .then((response) => {
      const users = response.body;
      this.setState({ users });
      // this.getTrailers(users);
    });
  }
  getTrailers(users) {
    const usersTrailers = users.map((user) => {
      const url = `/api/users/${user.id}/trailers`;
      return request.get(url);
    });
    let components;
    Promise.all(usersTrailers)
           .then((responseArray) => {
             components = responseArray.map((response) => {
               const trailers = response.body;
               return (
                 <li>
                   <TrailerCarousel header={`s Trailers`} trailers={trailers} />
                 </li>
               );
             });
             console.log(components);
             return components;
           })
           .catch(err => err);
  }
  render() {
    return (
      <div>
        <ul>{this.getTrailers(this.state.users)}</ul>
      </div>
    );
  }
}

export default Community;

import React, { Component } from 'react';
import request from 'superagent';
import TrailerCarousel from './TrailerCarousel.jsx';

class Community extends Component {
  constructor() {
    super();
    this.state = {
      user3: [],
      user4: [],
      user16: [],
    };
    this.getTrailers = this.getTrailers.bind(this);
  }
  // componentDidMount() {
  //   this.getUsers();
  // }
  // getUsers() {
  //   request.get('/api/users')
  //   .then((response) => {
  //     const users = response.body;
  //     this.setState({ users });
  //     // this.getTrailers(users);
  //   });
  // }
  // getTrailers(users) {
  //   const usersTrailers = users.map((user) => {
  //     const url = `/api/users/${user.id}/trailers`;
  //     return request.get(url);
  //   });
  //   let components;
  //   Promise.all(usersTrailers)
  //          .then((responseArray) => {
  //            components = responseArray.map((response) => {
  //              const trailers = response.body;
  //              return (
  //                <li>
  //                  <TrailerCarousel header={`s Trailers`} trailers={trailers} />
  //                </li>
  //              );
  //            });
  //            console.log(components);
  //            return components;
  //          })
  //          .catch(err => err);
  // }
  componentDidMount() {
    this.getTrailers(3);
    this.getTrailers(4);
    this.getTrailers(16);
  }
  getTrailers(id) {
    if (id) {
      const url = `/api/users/${id}/trailers`;
      request.get(url)
      .then((response) => {
        const trailers = response.body;
        const stateObject = {};
        stateObject[`user${id}`] = trailers;
        console.log(stateObject);
        this.setState(stateObject);
      })
      .catch(err => err);
    }
  }
  render() {
    let carousels = [];
    if (this.state.user3) {
      carousels.push((
        <TrailerCarousel
          key="3"
          header="Username's Trailers"
          trailers={this.state.user3}
          userID={'3'}
        />
      ));
    }
    if (this.state.user4) {
      carousels.push((
        <TrailerCarousel
          key="4"
          header="Username's Trailers"
          trailers={this.state.user4}
          userID={'4'}
        />
      ));
    }
    if (this.state.user16) {
      carousels.push((
        <TrailerCarousel
          key="16"
          header="Username's Trailers"
          trailers={this.state.user16}
          userID={'16'}
        />
      ));
    }
    return (
      <div className="community-container">
        {carousels}
      </div>
    );
  }
}

export default Community;

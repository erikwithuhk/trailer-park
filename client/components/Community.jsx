import React, { Component } from 'react';
import request from 'superagent';
import TrailerCarousel from './TrailerCarousel.jsx';

class Community extends Component {
  constructor() {
    super();
    this.state = {
      user26: [],
      user27: [],
      user29: [],
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
    this.getTrailers(26);
    this.getTrailers(27);
    this.getTrailers(29);
  }
  getTrailers(id) {
    if (id) {
      const url = `/api/users/${id}/trailers`;
      request.get(url)
      .then((response) => {
        const trailers = response.body;
        const stateObject = {};
        stateObject[`user${id}`] = trailers;
        this.setState(stateObject);
      })
      .catch(err => err);
    }
  }
  render() {
    const carousels = [];
    if (this.state.user26) {
      carousels.push((
        <TrailerCarousel
          key="26"
          header="iambob's Trailers"
          trailers={this.state.user26}
          userID={'26'}
        />
      ));
    }
    if (this.state.user27) {
      carousels.push((
        <TrailerCarousel
          key="27"
          header="kathere's Trailers"
          trailers={this.state.user27}
          userID={'27'}
        />
      ));
    }
    if (this.state.user29) {
      carousels.push((
        <TrailerCarousel
          key="29"
          header="imjoy's Trailers"
          trailers={this.state.user29}
          userID={'29'}
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

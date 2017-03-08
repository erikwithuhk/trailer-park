import React, { Component, PropTypes } from 'react';
import request from 'superagent';
import TrailerCarousel from './trailers/TrailerCarousel.jsx';

const propTypes = {
  fetchTrailers: PropTypes.func.isRequired,
};

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
  createCarousels() {
    return this.state.users.map(user => (
      <TrailerCarousel
        key={user.id}
        header={`${user.username}'s Trailers`}
        fetchTrailers={this.props.fetchTrailers}
        trailers={user.trailers}
        userID={user.id}
      />
    ));
  }
  render() {
    const carousels = this.createCarousels();
    return (
      <section className="community">
        {carousels}
      </section>
    );
  }
}

Community.propTypes = propTypes;

export default Community;

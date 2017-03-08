import React, { Component, PropTypes } from 'react';
import { hashHistory, withRouter } from 'react-router';
import request from 'superagent';
import TrailerCarousel from './trailers/TrailerCarousel.jsx';
import UserForm from './users/UserForm.jsx';

const propTypes = {
  currentUser: PropTypes.object,
  fetchTrailers: PropTypes.func,
  route: PropTypes.object,
  signOut: PropTypes.func,
  updateUser: PropTypes.func,
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
    };
    this.deleteUser = this.deleteUser.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps;
    this.setState({ currentUser });
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
    return (
      <section className="profile">
        <TrailerCarousel
          header="Your Trailers"
          fetchTrailers={this.props.fetchTrailers}
          trailers={this.props.currentUser.trailers}
          userID={this.props.currentUser.id}
        />
        <UserForm
          currentUser={this.props.currentUser}
          route={this.props.route}
          updateUser={this.props.updateUser}
        />
        <input
          type="submit"
          value="Delete"
          onClick={this.deleteUser}
        />
      </section>
    );
  }
}

UserProfile.propTypes = propTypes;

export default withRouter(UserProfile);

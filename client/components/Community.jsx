import React, { Component } from 'react';
import request from 'superagent';


class Community extends Component {
  constructor() {
    super();
    this.state = {
      userName: [],
      trailers: [],
   };
};

componentDidMount() {
    this.getUserId();
  }
  getUserId() {
    request.get('/api/users')
    .then((response) => {
      this.setState({ username: response.body });
    });
  }
// TO DO: WE JUST WANT A SIMPLE LIST OF USERNAMES AND THEIR TRAILERS
  // TODO: NEED TO GET THE ID FOR THE ABOVE USER NAME
  // TODO: THEN A SECOND API REQUEST TO GET THE TRAILERS BASED ON THE USER ID


render() {
  return (
    <div>
      <h3>{this.state}</h3>
    </div>
  );
}
}
export default Community;

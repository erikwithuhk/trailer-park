const UserDAO = require('../services/UserDAO');

class User {
  static createTrailers(string) {
    const trailers = [];
    if (string) {
      const trailersData = string.split('#@#');
      trailersData.forEach(trailerData => trailers.push(trailerData));
    }
    return trailers;
  }
  constructor({ id, email, password, username, first_name, last_name, bio, trailers }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.firstName = first_name;
    this.lastName = last_name;
    this.bio = bio;
    this.trailers = User.createTrailers(trailers);
  }
}

module.exports = User;

const UserTrailerDAO = require('../services/UserTrailerDAO');

class User {
  constructor({ id, email, password, username, first_name, last_name, bio }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.firstName = first_name;
    this.lastName = last_name;
    this.bio = bio;
    this.trailers = [];
  }
  getID() {
    return this.id;
  }
  addTrailers(trailers) {
    trailers.forEach((trailer) => {
      this.trailers.push(trailer);
    });
  }
  fetchTrailers() {
    const user_id = this.id;
    return UserTrailerDAO.find({ user_id })
                         .then((trailers) => {
                           this.addTrailers(trailers);
                           return this;
                         })
                         .catch(err => err);
  }
}

module.exports = User;

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
  addTrailers(trailers) {
    trailers.forEach((trailer) => {
      this.trailers.push(trailer);
    });
  }
  fetchTrailers() {
    return UserTrailerDAO.find({ user_id: this.id })
                         .then((trailers) => {
                           const trailersWithVideo = trailers.map(trailer => trailer.fetchVideo());
                           return Promise.all(trailersWithVideo);
                         })
                         .then((trailersWithVideo) => {
                           this.addTrailers(trailersWithVideo);
                           return this;
                         })
                         .catch(err => err);
  }
  deleteTrailers() {
    return UserTrailerDAO.deleteAll({ user_id: this.id });
  }
}

module.exports = User;

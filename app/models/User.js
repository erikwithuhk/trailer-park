const UserDAO = require('../services/UserDAO');
const Trailer = require('./Trailer');

class User {
  static parseTrailerData(string) {
    const dataItems = string.split('*@*');
    const mediaType = dataItems[0];
    const tmdbID = parseInt(dataItems[1], 10);
    const title = dataItems[2];
    const blocked = dataItems[3] === 't' ? true : false;
    const data = { tmdbID, title, mediaType, blocked };
    return data;
  }
  static createTrailers(string) {
    if (string) {
      const trailersData = string.split('#@#');
      const trailers = trailersData.map((trailerDataString) => {
        const data = User.parseTrailerData(trailerDataString);
        return new Trailer(data);
      });
      return trailers;
    }
    return [];
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

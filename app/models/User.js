const Trailer = require('./Trailer');

class User {
  static parseTrailerData(string) {
    const dataItems = string.split('*@*');
    const tmdbID = parseInt(dataItems[0], 10);
    const title = dataItems[1];
    const mediaType = dataItems[2];
    const data = { tmdbID, title, mediaType };
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

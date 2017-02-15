const db = require('../db/db');
const sql = require('../db/sqlProvider').usersTrailers;
const Trailer = require('../models/Trailer');
const TrailerListItem = require('../models/TrailerListItem');

class UserTrailerDAO {
  static all() {
    return db.map(sql.all, [], row => console.log(row))
             .catch(err => err);
  }
  static find(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.map(sql.find, [key, value], row => new Trailer(row))
             .catch(err => err);
  }
  static delete(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.none(sql.delete, [key, value])
             .catch(err => err);
  }
  // static allUserTrailers(userID) {
  //   return db.map(sql.all, [userID], row => new TrailerListItem(row));
  // }
  // static addTrailer(trailerData) {
  //   const { tmdb_id, media_type, title, blocked, users_id } = trailerData;
  //   return db.one(sql.create, [tmdb_id, media_type, title, blocked, users_id])
  //            .then(row => row);
  // }
}

module.exports = UserTrailerDAO;

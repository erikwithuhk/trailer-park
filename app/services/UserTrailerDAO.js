const db = require('../db/db');
const sql = require('../db/sqlProvider').usersTrailers;
const User = require('../models/User');
const Trailer = require('../models/Trailer');

class UserTrailerDAO {
  static find(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.map(sql.find, [key, value], (row) => {
      if (key === 'user_id') {
        return new Trailer(row);
      } else if (key === 'tmdb_id') {
        return new User(row);
      }
    })
    .catch(err => err);
  }
  static save({ user_id, tmdb_id, blocked }) {
    return db.none(sql.save, [user_id, tmdb_id, blocked])
             .catch(err => err);
  }
  static update({ user_id, tmdb_id, blocked }) {
    return db.none(sql.update, [user_id, tmdb_id, blocked])
             .catch(err => err)
  }
  static deleteOne({ user_id, tmdb_id }) {
    return db.none(sql.deleteOne, [user_id, tmdb_id])
             .catch(err => err);
  }
  static deleteAll(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.none(sql.deleteAll, [key, value])
             .catch(err => err);
  }
}

module.exports = UserTrailerDAO;

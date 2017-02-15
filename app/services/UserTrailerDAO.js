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
  static delete(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.none(sql.delete, [key, value])
             .catch(err => err);
  }
}

module.exports = UserTrailerDAO;

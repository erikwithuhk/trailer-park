const db = require('../config/db');
const sql = require('../config/sqlProvider').usersTrailers;
const TrailerListItem = require('../models/TrailerListItem');

class UserTrailerDAO {
  static allUserTrailers(userID) {
    return db.map(sql.all, [userID], row => new TrailerListItem(row));
  }
  static addTrailer(trailerData) {
    const { tmdb_id, media_type, title, blocked, users_id } = trailerData;
    return db.one(sql.create, [tmdb_id, media_type, title, blocked, users_id])
             .then(row => row);
  }
}

module.exports = UserTrailerDAO;

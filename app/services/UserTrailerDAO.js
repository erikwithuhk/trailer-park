const db = require('../config/db');
const sql = require('../config/sqlProvider').usersTrailers;
const TrailerListItem = require('../models/TrailerListItem');

class UserTrailerDAO {
  static allUserTrailers(userID) {
    return db.map(sql.all, [userID], row => new TrailerListItem(row));
  }
}

module.exports = UserTrailerDAO;

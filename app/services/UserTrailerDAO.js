const db = require('../config/db');
const sql = require('../config/sqlProvider').users;
const TrailerListItem = require('../models/TrailerListItem');

class UserTrailerDAO {
  static all() {
    return db.map(sql.all, [], row => new TrailerListItem(row));
  }
}

module.exports = UserTrailerDAO;

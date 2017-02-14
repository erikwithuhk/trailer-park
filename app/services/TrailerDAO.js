const db = require('../db/db');
const sql = require('../db/sqlProvider').trailers;
const Trailer = require('../models/Trailer');

class TrailerDAO {
  static all() {
    return db.map(sql.all, [], row => new Trailer(row));
  }
  static find(id) {
    return db.one(sql.find, ['tmdb_id', id])
             .then(row => new Trailer(row))
             .catch(err => err);
  }
  static findBy(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    const uniqueKeys = ['tmdb_id'];
    if (uniqueKeys.includes(key)) {
      return db.one(sql.find, [key, value])
               .then(row => new Trailer(row))
               .catch(err => err);
    }
    return db.map(sql.where, [key, value], row => new Trailer(row))
             .catch(err => err);
  }
  static save({ tmdbID, title, mediaType }) {
    return db.one(sql.save, [tmdbID, title, mediaType])
             .then(row => new Trailer(row))
             .catch(err => err);
  }
  static update({ tmdbID, title, mediaType }) {
    return db.one(sql.update, [tmdbID, title, mediaType])
             .then(row => new Trailer(row))
             .catch(err => err);
  }
  static delete(tmdbID) {
    return db.none(sql.delete, [tmdbID]);
  }
}

module.exports = TrailerDAO;

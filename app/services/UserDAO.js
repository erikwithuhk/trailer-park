const db = require('../db/db');
const sql = require('../db/sqlProvider').users;
const User = require('../models/User');

class UserDAO {
  static all() {
    return db.map(sql.all, [], row => new User(row))
             .catch(err => err);
  }
  static find(id) {
    return db.one(sql.find, ['id', id])
             .then(row => new User(row))
             .catch(err => err);
  }
  static findBy(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.map(sql.where, [key, value], row => new User(row))
             .catch(err => err);
  }
  static save({ email, password, username }) {
    return db.one(sql.save, [email, password, username])
             .then(row => new User(row))
             .catch(err => err);
  }
  static update({ id, email, username, firstName, lastName, bio, password }) {
    return db.one(sql.update, [id, email, username, firstName, lastName, bio, password])
             .then(row => new User(row))
             .catch(err => err);
  }
  static delete(id) {
    return db.none(sql.delete, [id])
             .catch(err => err);
  }
}

module.exports = UserDAO;

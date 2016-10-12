const UserDAO = require('../services/UserDAO');

class User {
  constructor({ id, email, password, username, first_name, last_name, bio }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.firstName = first_name;
    this.lastName = last_name;
    this.bio = bio;
  }
  update(options) {
    Object.keys(options).forEach((key) => {
      if (key !== 'id') {
        this[key] = options[key];
      }
    });
    // const updatedUser = this;
    // return this;
    UserDAO.save(this);
  }
}

module.exports = User;

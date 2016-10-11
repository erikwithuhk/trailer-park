const UserDAO = require('../services/UserDAO');

class UserController {
  static getAll(req, res) {
    UserDAO.all().then((users) => {
      res.status(200).json(users);
    });
  }
  static getOne(req, res) {
    UserDAO.findBy({ id: req.params.id })
           .then((user) => res.status(200).json(user));
  }
}

module.exports = UserController;

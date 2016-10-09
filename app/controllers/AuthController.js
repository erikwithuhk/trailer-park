const UserDAO = require('../services/UserDAO');
const createToken = require('../utilis/createToken');
const bcrypt = require('bcrypt');

class AuthController {
  static login(req, res) {
    const { email, password } = req.body;
    UserDAO.findBy({ email })
      .then((user) => {
        if (!bcrypt.compareSync(password, user.password)) {
          res.status(401).end();
        } else {
          req.session.currentUser = user;
          const token = createToken(user);
          res.cookie('token', token);
          res.status(200).json(user);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(401).end();
      });
  }
  static signUp(req, res) {
    const email = req.body.email;
    let password = req.body.password;
    if (email.length > 0 && password.length > 0) {
      password = bcrypt.hashSync(password, 10);
      UserDAO.create({ email, password })
          .then((user) => {
            req.session.currentUser = user;
            const token = createToken(user);
            res.cookie('token', token);
            res.status(200).json(user);
          })
          .catch((err) => res.status(500).json(err));
    } else {
      res.status(400).end();
    }
  }
  static signOut(req, res) {
    req.session.currentUser = null;
    res.clearCookie('token');
    res.status(204).end();
  }
}

module.exports = AuthController;

const bcrypt = require('bcrypt');

const UserDAO = require('../services/UserDAO');
const createToken = require('../utils/createToken');

class AuthController {
  static login(req, res) {
    const { email, password } = req.body;
    UserDAO.findBy({ email })
      .then((user) => {
        if (!bcrypt.compareSync(password, user.password)) {
          res.status(401).json({ error: 'Incorrect password' });
        } else {
          req.session.currentUser = user;
          const token = createToken(user);
          res.cookie('token', token);
          res.status(200).json(token);
        }
      })
      .catch((err) => {
        res.status(401).json({ error: 'Unregistered user' });
      });
  }
  static signUp(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    let password = req.body.password;
    if (email.length > 0 && password.length > 0) {
      password = bcrypt.hashSync(password, 10);
      UserDAO.save({ email, password, username })
          .then((user) => {
            req.session.currentUser = user;
            const token = createToken(user);
            res.cookie('token', token);
            res.status(200).json(token);
          })
          .catch(err => res.status(500).json(err));
    } else {
      res.status(400).json({ error: 'No email or password entered' });
    }
  }
  static signOut(req, res) {
    req.session.currentUser = null;
    res.clearCookie('token');
    res.status(204).end();
  }
}

module.exports = AuthController;

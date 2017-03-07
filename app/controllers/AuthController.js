const bcrypt = require('bcrypt');

const UserDAO = require('../services/UserDAO');
const createToken = require('../utils/createToken');

class AuthController {
  static login(req, res, next) {
    const { email, password } = req.body;
    UserDAO.findBy({ email })
      .then((userArray) => {
        const user = userArray[0];
        if (!bcrypt.compareSync(password, user.password)) {
          res.status(401).json({ error: 'Incorrect password' });
        } else {
          user.fetchTrailers()
              .then((userWithTrailers) => {
                req.session.currentUser = userWithTrailers;
                const token = createToken(userWithTrailers);
                res.cookie('token', token);
                res.status(200).json(token);
              })
              .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  }
  static signUp(req, res, next) {
    const email = req.body.email;
    const username = req.body.username;
    let password = req.body.password;
    if (email.length > 0 && password.length > 0) {
      password = bcrypt.hashSync(password, 10);
      UserDAO.save({ email, password, username })
          .then((user) => {
            user.fetchTrailers()
                .then((userWithTrailers) => {
                  req.session.currentUser = userWithTrailers;
                  const token = createToken(userWithTrailers);
                  res.cookie('token', token);
                  res.status(200).json(token);
                })
                .catch(err => next(err));
          })
          .catch(err => next(err));
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

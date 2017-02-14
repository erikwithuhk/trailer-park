const UserDAO = require('../services/UserDAO');

class UserController {
  static index(req, res) {
    if() {

    }
    UserDAO.all()
           .then(users => res.status(200).json(users))
           .catch(err => res.status(500).json(err));
  }
  static show(req, res) {
    UserDAO.find(req.params.user_id)
           .then(user => res.status(200).json(user))
           .catch(err => res.status(500).json(err));
  }
  static update(req, res) {
    const { email, username, firstName, lastName, bio } = req.body;
    UserDAO.findBy({ id: req.params.user_id })
      .then((user) => {
        const dataToUpdate = {
          id: user.id,
          email: email || user.email,
          username: username || user.username,
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
          bio: bio || user.bio,
          password: user.password,
        };
        UserDAO.save(dataToUpdate)
          .then((updatedUser) => {
            res.status(200).send(updatedUser);
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch(err => res.send(err));
  }
  static delete(req, res) {
    UserDAO.delete(req.params.user_id)
           .then(() => res.status(204).end())
           .catch(err => res.status(500).json(err));
  }
}

module.exports = UserController;

const UserDAO = require('../services/UserDAO');
const UserTrailerDAO = require('../services/UserTrailerDAO');

class UserController {
  static index(req, res) {
    const query = req.query;
    if (Object.keys(query).length > 0) {
      UserController.filterUsers(query, res);
    } else {
      UserController.allUsers(res);
    }
  }
  static allUsers(res) {
    UserDAO.all()
           .then((users) => {
             if (users.error) {
               res.status(500).json(users.error);
             }
             UserController.fetchAllUserTrailers(users, res);
           })
           .catch(err => res.status(500).json(err));
  }
  static filterUsers(query, res) {
    UserDAO.findBy(query)
    // TODO support multiple queries
           .then((users) => {
             if (users.error) {
               res.status(500).json(users.error);
             }
             UserController.fetchAllUserTrailers(users, res);
           })
           .catch(err => res.status(500).json(err));
  }
  static show(req, res) {
    UserDAO.find(req.params.user_id)
           .then((user) => {
             UserController.fetchUserTrailers(user)
                           .then(userWithTrailers => res.status(200).json(userWithTrailers))
                           .catch(err => res.status(500).json(err));
           })
           .catch(err => res.status(500).json(err));
  }
  static update(req, res) {
    const { email, username, firstName, lastName, bio } = req.body;
    UserDAO.find(req.params.user_id)
      .then((user) => {
        const dataToUpdate = {
          id: req.params.user_id,
          email: email || user.email,
          username: username || user.username,
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
          bio: bio || user.bio,
          password: user.password,
        };
        UserDAO.update(dataToUpdate)
               .then((updatedUser) => {
                 UserController.fetchUserTrailers(updatedUser)
                               .then(userWithTrailers => res.status(200).json(userWithTrailers))
                               .catch(err => res.status(500).json(err));
               })
               .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
  static delete(req, res) {
    const user_id = parseInt(req.params.user_id, 10);
    UserTrailerDAO.deleteAll({ user_id })
                  .then((user_id) => {
                    UserDAO.delete(user_id)
                           .then(() => res.status(204).end())
                           .catch(err => res.status(500).json(err));
                  })
                  .catch(err => res.status(500).json(err));
  }
  static fetchAllUserTrailers(users, res) {
    const userTrailers = users.map(user => UserController.fetchUserTrailers(user));
    Promise.all(userTrailers)
           .then((usersWithTrailers) => {
             res.status(200).json(usersWithTrailers);
           })
           .catch(err => res.status(500).json(err));
  }
  static fetchUserTrailers(user) {
    const user_id = user.id;
    return UserTrailerDAO.find({ user_id })
                         .then((trailers) => {
                           const trailersWithVideo = trailers.map(trailer => trailer.fetchVideo());
                           return Promise.all(trailersWithVideo);
                         })
                         .then((trailersWithVideo) => {
                           user.addTrailers(trailersWithVideo);
                           return user;
                         })
                         .catch(err => err);
  }
}

module.exports = UserController;

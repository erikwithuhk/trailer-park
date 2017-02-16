const createToken = require('../utils/createToken');
const UserDAO = require('../services/UserDAO');

class UserController {
  static index(req, res, next) {
    const query = req.query;
    let fetchUsers;
    if (Object.keys(query).length > 0) {
      fetchUsers = UserController.filterUsers(query);
    } else {
      fetchUsers = UserController.allUsers();
    }
    fetchUsers.then((users) => {
      const fetchUserTrailers = users.map(user => user.fetchTrailers(user));
      Promise.all(fetchUserTrailers)
             .then((usersWithTrailers) => {
               res.status(200).json(usersWithTrailers);
             })
             .catch(err => next(err));
    })
   .catch(err => next(err));
  }
  static show(req, res, next) {
    UserDAO.find(req.params.user_id)
           .then((user) => {
             user.fetchTrailers()
                 .then(userWithTrailers => res.status(200).json(userWithTrailers))
                 .catch(err => next(err));
           })
           .catch(err => next(err));
  }
  static update(req, res, next) {
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
                 updatedUser.fetchTrailers()
                            .then((userWithTrailers) => {
                              req.session.currentUser = userWithTrailers;
                              const token = createToken(userWithTrailers);
                              res.cookie('token', token);
                              res.status(200).json(userWithTrailers);
                            })
                            .catch(err => next(err));
               })
               .catch(err => next(err));
      })
      .catch(err => next(err));
  }
  static delete(req, res, next) {
    const { user_id } = req.params;
    UserDAO.find(user_id)
           .then((user) => {
             user.deleteTrailers()
                 .then(() => {
                   UserDAO.delete(user.id)
                          .then(() => res.status(204).end())
                          .catch(err => next(err));
                 })
                 .catch(err => next(err));
           })
           .catch(err => next(err));
  }
  static allUsers() {
    return UserDAO.all()
           .then((users) => {
             if (users.error) { return users.error; }
             return users;
           })
           .catch(err => err);
  }
  static filterUsers(query) {
    return UserDAO.findBy(query)
    // TODO support multiple queries
           .then((users) => {
             if (users.error) { return users.error; }
             return users;
           })
           .catch(err => err);
  }
}

module.exports = UserController;

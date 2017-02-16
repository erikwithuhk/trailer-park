const UserDAO = require('../services/UserDAO');

class UserController {
  static index(req, res) {
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
             .catch(err => res.status(500).json(err));
    })
   .catch(err => res.status(500).json(err));
  }
  static show(req, res) {
    UserDAO.find(req.params.user_id)
           .then((user) => {
             user.fetchTrailers()
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
    // const
    // UserTrailerDAO.deleteAll({ user_id })
                  // .then((user_id) => {
                    UserDAO.delete(userId)
                           .then(() => res.status(204).end())
                           .catch(err => res.status(500).json(err));
                  // })
                  // .catch(err => res.status(500).json(err));
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

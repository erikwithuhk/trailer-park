const UserDAO = require('../services/UserDAO');

class UserController {
  static index(req, res) {
    const query = req.query;
    let fetchUsers;
    if (Object.keys(query).length > 0) {
      fetchUsers = UserController.filterUsers(query, res);
    } else {
      fetchUsers = UserController.allUsers(res);
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
  static allUsers(res) {
    return UserDAO.all()
           .then((users) => {
             if (users.error) { return users.error; }
             return users;
           })
           .catch(err => err);
  }
  static filterUsers(query, res) {
    return UserDAO.findBy(query)
    // TODO support multiple queries
           .then((users) => {
             if (users.error) { return users.error; }
             return users;
           })
           .catch(err => err);
  }
  static show(req, res) {
    UserDAO.find(req.params.user_id)
           .then((user) => {
             user.fetchTrailers()
            //  UserController.fetchUserTrailers(user)
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
  //   const user_id = parseInt(req.params.user_id, 10);
  //   UserTrailerDAO.deleteAll({ user_id })
  //                 .then((user_id) => {
  //                   UserDAO.delete(user_id)
  //                          .then(() => res.status(204).end())
  //                          .catch(err => res.status(500).json(err));
  //                 })
  //                 .catch(err => res.status(500).json(err));
  }
}

module.exports = UserController;

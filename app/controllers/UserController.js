const UserDAO = require('../services/UserDAO');

class UserController {
  static getAll(request, response) {
    UserDAO.all()
           .then(users => response.status(200).json(users))
           .catch(err => response.status(500).json(err));
  }
  static getOne(request, response) {
    UserDAO.findBy({ id: request.params.user_id })
           .then(user => response.status(200).json(user))
           .catch(err => response.status(500).json(err));
  }
  static update(request, response) {
    const dataToUpdate = request.body;
    UserDAO.findBy({ id: request.params.user_id })
           .then((user) => {
             response.status(200).send(user.update(dataToUpdate));
            //  user.update(dataToUpdate)
            //      .then(updatedUser => response.status(200).send(updatedUser))
            //      .catch(err => response.status(500).json(err));
           })
           .catch(err => response.status(500).json(err));
  }
  static delete(request, response) {
    UserDAO.delete(request.params.user_id)
           .then(() => response.status(204).end())
           .catch(err => response.status(500).json(err));
  }
}

module.exports = UserController;

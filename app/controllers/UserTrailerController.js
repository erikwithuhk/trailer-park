const TrailerDAO = require('../services/TrailerDAO');
const UserTrailerDAO = require('../services/UserTrailerDAO');

class UserTrailerController {
  static getTrailers(request, response) {
    UserTrailerDAO.allUserTrailers(request.params.user_id).then((trailerListItems) => {
      response.status(200).send(trailerListItems);
    })
    .catch(err => response.status(500).json(err));
  }
}

module.exports = UserTrailerController;

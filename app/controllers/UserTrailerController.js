const TrailerDAO = require('../services/TrailerDAO');
const UserTrailerDAO = require('../services/UserTrailerDAO');

class UserTrailerController {
  static getTrailers(request, response) {
    const userID = request.params.user_id;
    response.status(200).send(`Trailers for ${userID}`);
  }
}

module.exports = UserTrailerController;

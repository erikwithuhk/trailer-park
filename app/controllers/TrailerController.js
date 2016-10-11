const superagent = require('superagent');
const TrailerDAO = require('../services/TrailerDAO');

class TrailerController {
  static getTrailers(request, response) {
    const searchTerm = request.query.q;
    TrailerDAO.search(searchTerm)
              .then((trailerListItems) => {
                response.status(200).send(trailerListItems);
              })
              .catch(err => send(err));
  }
}

module.exports = TrailerController;

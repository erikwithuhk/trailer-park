const superagent = require('superagent');
const TrailerDAO = require('../services/TrailerDAO');

class TrailerController {
  static searchTrailers(request, response) {
    const searchTerm = request.query.q;
    TrailerDAO.search(searchTerm)
              .then((trailerListItems) => {
                response.status(200).send(trailerListItems);
              })
              .catch(err => response.status(500).send(err));
  }
}

module.exports = TrailerController;

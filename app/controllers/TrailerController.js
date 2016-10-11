// const superagent = require('superagent');
const TrailerDAO = require('../services/TrailerDAO');
// require('dotenv').config();

class TrailerController {
  static searchTrailers(request, response) {
    const searchTerm = request.query.q;
    TrailerDAO.search(searchTerm)
              .then((trailerListItems) => {
                response.status(200).send(trailerListItems);
              })
              .catch(err => response.status(500).send(err));
  }
  static getTrailerInfo(request, response) {
    // const apiKey = process.env.API_KEY;
    const trailerID = request.params.trailer_id;
    TrailerDAO.getTrailerInfo(trailerID)
              .then(trailerInfo => response.status(200).send(trailerInfo))
              .catch(err => response.status(500).json(err));
  }
}

module.exports = TrailerController;

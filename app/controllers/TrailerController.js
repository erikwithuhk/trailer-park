const TrailerDAO = require('../services/TrailerDAO');

class TrailerController {
  static searchTrailers(request, response) {
    const searchTerm = request.query.q;
    TrailerDAO.search(searchTerm)
              .then((trailerListItems) => {
                const trailersWithVideo = trailerListItems.map(trailerListItem => trailerListItem.getVideoKeyAndImage());
                return Promise.all(trailersWithVideo).then(videosData => response.status(200).send(videosData));
              })

              .catch(err => response.status(500).send(err));
  }
  static getTrailerInfo(request, response) {
    const trailerID = request.params.trailer_id;
    TrailerDAO.getTrailerInfo(trailerID)
              .then(trailerInfo => response.status(200).send(trailerInfo))
              .catch(err => response.status(500).json(err));
  }
}

module.exports = TrailerController;

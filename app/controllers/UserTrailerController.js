const TrailerDAO = require('../services/TrailerDAO');
const UserTrailerDAO = require('../services/UserTrailerDAO');

class UserTrailerController {
  static getTrailers(request, response) {
    UserTrailerDAO.allUserTrailers(request.params.user_id).then((trailerListItems) => {
      const trailersWithVideo = trailerListItems.map(trailerListItem => trailerListItem.getVideoKeyAndImage());
      return Promise.all(trailersWithVideo).then(videosData => response.status(200).send(videosData));
    })
    .catch(err => response.status(500).json(err));
  }
  static addTrailer(request, response) {
    const trailerData = {
      tmdb_id: request.body.tmdbID,
      media_type: request.body.mediaType,
      title: request.body.title,
      blocked: request.body.blocked,
      users_id: request.params.user_id,
    };
    UserTrailerDAO.addTrailer(trailerData)
                  .then((trailerItem) => {
                    response.status(200).send(trailerItem);
                  })
                  .catch(err => response.status(500).json(err));
  }
}

module.exports = UserTrailerController;

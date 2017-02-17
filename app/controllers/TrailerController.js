const TrailerDAO = require('../services/TrailerDAO');

class TrailerController {
  static index(req, res, next) {
    const query = req.query;
    let fetchTrailers;
    if (Object.keys(query).length > 0) {
      fetchTrailers = TrailerDAO.findBy(query);
      // TODO make case insensitive
      // TODO support multiple queries
    } else {
      fetchTrailers = TrailerDAO.all();
    }
    fetchTrailers.then((trailers) => {
                    const trailersWithVideo = trailers.map(trailer => trailer.fetchVideo());
                    return Promise.all(trailersWithVideo);
                  })
                  .then((trailersWithVideo) => {
                    res.status(200).json(trailersWithVideo);
                  })
                  .catch(err => next(err));
  }
  static show(req, res, next) {
    TrailerDAO.find(req.params.tmdb_id)
              .then((trailer) => {
                trailer.fetchVideo()
                       .then((trailerWithVideo) => {
                         res.status(200).json(trailerWithVideo);
                       })
                       .catch(err => next(err));
              })
              .catch(err => next(err));
  }
  static create(req, res, next) {
    const { tmdbID, title, mediaType } = req.body;
    TrailerDAO.save({ tmdbID, title, mediaType })
              .then((trailer) => {
                trailer.fetchVideo()
                       .then((trailerWithVideo) => {
                         res.status(200).json(trailerWithVideo);
                       })
                       .catch(err => next(err));
              })
              .catch(err => next(err));
  }
  static update(req, res, next) {
    const { title, mediaType } = req.body;
    TrailerDAO.find(req.params.tmdb_id)
      .then((trailer) => {
        const dataToUpdate = {
          tmdbID: trailer.tmdbID,
          title: title || trailer.title,
          mediaType: mediaType || trailer.mediaType,
        };
        TrailerDAO.update(dataToUpdate)
                  .then((updatedTrailer) => {
                    updatedTrailer.fetchVideo()
                           .then((trailerWithVideo) => {
                             res.status(200).json(trailerWithVideo);
                           })
                           .catch(err => next(err));
                  })
                  .catch(err => next(err));
      })
      .catch(err => next(err));
  }
  static delete(req, res, next) {
    TrailerDAO.delete(req.params.tmdb_id)
              .then(() => res.status(204).end())
              .catch(err => next(err));
  }
  static popular(req, res, next) {
    TrailerDAO.popularMovies()
              .then(trailers => res.status(200).json(trailers))
              .catch(err => next(err));
  }
  static search(req, res, next) {
    const searchQuery = req.query.q;
    TrailerDAO.search(searchQuery)
              .then(trailer => res.status(200).json(trailer))
              .catch(err => next(err));
  }
}

module.exports = TrailerController;

const TrailerDAO = require('../services/TrailerDAO');

class TrailerController {
  static index(req, res) {
    const query = req.query;
    let trailerPromise;
    if (Object.keys(query).length > 0) {
      trailerPromise = TrailerDAO.findBy(query);
      // TODO make case insensitive
      // TODO support multiple queries
    } else {
      trailerPromise = TrailerDAO.all();
    }
    trailerPromise.then((trailers) => {
      const trailersWithVideo = trailers.map(trailer => trailer.fetchVideo());
      return Promise.all(trailersWithVideo);
    })
    .then((trailersWithVideo) => {
      res.status(200).json(trailersWithVideo);
    })
    .catch(err => res.status(500).json(err));
  }
  static show(req, res) {
    TrailerDAO.find(req.params.tmdb_id)
              .then((trailer) => {
                trailer.fetchVideo()
                       .then((trailerWithVideo) => {
                         res.status(200).json(trailerWithVideo);
                       })
                       .catch(err => err);
              })
              .catch(err => res.status(500).json(err));
  }
  static create(req, res) {
    const { tmdbID, title, mediaType } = req.body;
    TrailerDAO.save({ tmdbID, title, mediaType })
              .then(trailer => res.status(200).json(trailer))
              .catch(err => res.status(500).json(err));
  }
  static update(req, res) {
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
                           .catch(err => err);
                  })
                  .catch((err) => {
                    res.send(err);
                  });
      })
      .catch(err => res.send(err));
  }
  static delete(req, res) {
    TrailerDAO.delete(req.params.tmdb_id)
           .then(() => res.status(204).end())
           .catch(err => res.status(500).json(err));
  }
}

module.exports = TrailerController;

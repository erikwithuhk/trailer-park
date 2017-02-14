const TrailerDAO = require('../services/TrailerDAO');

class TrailerController {
  static index(req, res) {
    const query = req.query;
    if (Object.keys(query).length > 0) {
      TrailerDAO.findBy(query)
      // TODO make case insensitive
      // TODO support multiple queries
             .then(data => !data.error ? res.status(200).json(data) : res.status(500).json(data))
             .catch(err => res.status(500).json(err));
    } else {
      TrailerDAO.all()
             .then(trailers => res.status(200).json(trailers))
             .catch(err => res.status(500).json(err));
    }
  }
  static show(req, res) {
    TrailerDAO.find(req.params.trailer_id)
           .then(trailer => res.status(200).json(trailer))
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
    TrailerDAO.find(req.params.trailer_id)
      .then((trailer) => {
        const dataToUpdate = {
          tmdbID: trailer.tmdbID,
          title: title || trailer.title,
          mediaType: mediaType || trailer.mediaType,
        };
        TrailerDAO.update(dataToUpdate)
          .then(data => !data.error ? res.status(200).json(data) : res.status(500).json(data))
          .catch((err) => {
            res.send(err);
          });
      })
      .catch(err => res.send(err));
  }
  static delete(req, res) {
    TrailerDAO.delete(req.params.trailer_id)
           .then(() => res.status(204).end())
           .catch(err => res.status(500).json(err));
  }
}

module.exports = TrailerController;

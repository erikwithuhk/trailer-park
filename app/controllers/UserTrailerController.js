const UserTrailerDAO = require('../services/UserTrailerDAO');

class UserTrailerController {
  static index(req, res, next) {
    const user_id = req.params.user_id;
    UserTrailerDAO.find({ user_id })
                  .then((trailers) => {
                    const fetchVideos = trailers.map(trailer => trailer.fetchVideo());
                    Promise.all(fetchVideos)
                           .then((trailersWithVideo) => {
                             res.status(200).json(trailersWithVideo);
                           });
                  })
                  .catch(err => next(err));
  }
  static create(req, res, next) {
    const { user_id } = req.params;
    const { tmdbID, blocked } = req.body;
    UserTrailerDAO.save({ user_id, tmdbID, blocked })
                  .then(() => res.status(204).end())
                  .catch(err => next(err));
  }
  static update(req, res, next) {
    const { user_id, tmdb_id } = req.params;
    const { blocked } = req.body;
    UserTrailerDAO.update({ user_id, tmdb_id, blocked })
                  .then(() => res.status(204).end())
                  .catch(err => next(err));
  }
  static deleteOne(req, res, next) {
    const { user_id, tmdb_id } = req.params;
    UserTrailerDAO.deleteOne({ user_id, tmdb_id })
                  .then(() => res.status(204).end())
                  .catch(err => next(err));
  }
}

module.exports = UserTrailerController;

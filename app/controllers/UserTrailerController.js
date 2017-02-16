const UserTrailerDAO = require('../services/UserTrailerDAO');

class UserTrailerController {
  static index(req, res) {
    const user_id = parseInt(req.params.user_id, 10);
    UserTrailerDAO.find({ user_id })
                  .then(trailers => res.status(200).json(trailers))
                  .catch(err => res.status(500).json(err));
  }
  static create(req, res) {
    const { user_id } = req.params;
    const { tmdb_id, blocked } = req.body;
    UserTrailerDAO.save({ user_id, tmdb_id, blocked })
                  .then(() => res.status(204).end())
                  .catch(err => res.status(500).json(err));
  }
  static update(req, res) {
    const { user_id, tmdb_id } = req.params;
    const { blocked } = req.body;
    UserTrailerDAO.update({ user_id, tmdb_id, blocked })
                  .then(() => res.status(204).end())
                  .catch(err => res.status(500).json(err));
  }
  static deleteOne(req, res) {
    const { user_id, tmdb_id } = req.params;
    UserTrailerDAO.deleteOne({ user_id, tmdb_id })
                  .then(() => res.status(204).end())
                  .catch(err => res.status(500).json(err));
  }
}

module.exports = UserTrailerController;

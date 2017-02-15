const UserDAO = require('../services/UserDAO');
const TrailerDAO = require('../services/TrailerDAO');

const User = require('../models/User');
const Trailer = require('../models/Trailer');
const UserTrailer = require('../models/UserTrailer');

class UsersTrailersController {
  static index(req, res) {
    UserDAO.find(req.params.user_id)
           .then((user) => {
             TrailerDAO.find(9340)
                       .then((trailer) => {
                         const userTrailer = new UserTrailer({ user, trailer });
                         res.status(200).json(userTrailer)
                       })
                       .catch(err => res.status(500).json(err));
           })
           .catch(err => res.status(500).json(err));
    // const user = new User({
    //   email: 'erik@test.com',
    //   username: 'erikwithuhk',
    //   first_name: 'Erik',
    //   last_name: 'Jönsson',
    //   bio: 'love obscure comedy',
    //   password: 'password'
    // });
    // const trailer = new Trailer({ tmdb_id: 666, title: 'test', media_type: 'movie' });
    // res.status(200).json(userTrailer);
    // const query = req.query;
    // if (Object.keys(query).length > 0) {
    //   TrailerDAO.findBy(query)
    //   // TODO make case insensitive
    //   // TODO support multiple queries
    //          .then(data => !data.error ? res.status(200).json(data) : res.status(500).json(data))
    //          .catch(err => res.status(500).json(err));
    // } else {
    //   TrailerDAO.all()
    //          .then(trailers => res.status(200).json(trailers))
    //          .catch(err => res.status(500).json(err));
    // }
  }
}

module.exports = UsersTrailersController;

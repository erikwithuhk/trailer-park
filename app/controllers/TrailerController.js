const superagent = require('superagent');
const TrailerDAO = require('../services/TrailerDAO');
require('dotenv').config();

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
    const apiKey = process.env.API_KEY;
    const movieId = 550;

    // ONCE WE ALREADY HAVE THE movieId (above)
    // GET DETAILS BASED ON movieId
    superagent
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos,credits`)
      .catch(err => response.status(500).json(err))
      .then(movieDetails => response.send(movieDetails.body));

    // NEXT WE NEED TO TAKE OUT THE RELEVANT DATA WE WANT (CLEAN IT UP)
  }
}

module.exports = TrailerController;

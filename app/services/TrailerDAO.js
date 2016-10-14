const superagent = require('superagent');
const TrailerListItem = require('../models/TrailerListItem');

class TrailerDAO {
  static search(searchTerm) {
    return superagent.get(`https://api.themoviedb.org/3/search/multi?query=${searchTerm}&api_key=${process.env.API_KEY}`)
              .then((response) => {
                const searchResultsData = response.body.results;
                const searchResults = [];
                searchResultsData.forEach((searchResultData) => {
                  const { media_type } = searchResultData;
                  if (media_type === 'tv' || media_type === 'movie') {
                    const trailerData = {
                      tmdb_id: searchResultData.id,
                      media_type,
                      title: searchResultData.name || searchResultData.title,
                    };
                    searchResults.push(trailerData);
                  }
                });
                return searchResults;
              })
              .then(response => response.map(trailerData => new TrailerListItem(trailerData)))
              .catch(err => err);
  }
  static popular() {
    return superagent.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
              .then((response) => {
                const popularResultsData = response.body.results;
                return popularResultsData.map((popularResultData) => {
                  return {
                    tmdb_id: popularResultData.id,
                    media_type: 'movie',
                    title: popularResultData.title,
                  };
                });
              })
              .then(response => response.map(trailerData => new TrailerListItem(trailerData)))
              .catch(err => err);
  }
  static getTrailerInfo(trailerID) {
    return superagent
      .get(`https://api.themoviedb.org/3/movie/${trailerID}?api_key=${process.env.API_KEY}&append_to_response=videos,credits`)
      .then(trailerDetails => trailerDetails.body)
      .catch(err => err);
  }
}

module.exports = TrailerDAO;

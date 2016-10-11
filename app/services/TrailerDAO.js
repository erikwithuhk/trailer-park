const superagent = require('superagent');
const TrailerListItem = require('../models/TrailerListItem');

class TrailerDAO {
  static search(searchTerm) {
    return superagent.get(`https://api.themoviedb.org/3/search/multi?query=${searchTerm}&api_key=${process.env.API_KEY}`)
              .then((response) => {
                const searchResultsData = response.body.results;
                const searchResults = [];
                searchResultsData.forEach((searchResultData) => {
                  const mediaType = searchResultData.media_type;
                  if (mediaType === 'tv' || mediaType === 'movie') {
                    const trailerData = {
                      tmdbID: searchResultData.id,
                      mediaType,
                      title: searchResultData.name || searchResultData.title,
                    };
                    searchResults.push(trailerData);
                  }
                });
                return this.getVideoKeys(searchResults);
              })
              .then(response => response)
              .catch(err => err);
  }
  static getVideoKeys(trailers) {
    const getVideoData = trailers.map((trailer) => {
      return superagent.get(`https://api.themoviedb.org/3/${trailer.mediaType}/${trailer.tmdbID}/videos?api_key=${process.env.API_KEY}`)
                       .then((response) => {
                         const videoData = response.body.results;
                         if (videoData.length > 0) {
                           trailer.hasTrailer = true;
                           trailer.videoSite = videoData[0].site;
                           trailer.videoKey = videoData[0].key;
                           // TODO search through videos returned and find trailers if present
                           return trailer;
                         }
                         trailer.hasTrailer = false;
                         return trailer;
                       })
                       .catch(err => err);
    });
    return Promise.all(getVideoData).then(videosData => videosData);
  }
}

module.exports = TrailerDAO;

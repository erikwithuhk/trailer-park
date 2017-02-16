const request = require('superagent');

const baseURL = 'https://api.themoviedb.org/3';
const apiKey = process.env.API_KEY;
const urlSuffix = `?api_key=${apiKey}&append_to_response=videos`;

class TMDB {
  static fetchTrailerData({ mediaType, tmdbID }) {
    const url = `${baseURL}/${mediaType}/${tmdbID}${urlSuffix}`;
    return request.get(url)
                  .then((response) => {
                    const trailerData = TMDB.parseTrailerData(response.body);
                    return trailerData;
                  })
                  .catch(err => err);
  }
  static parseTrailerData(data) {
    const imagePath = data.backdrop_path;
    const videoData = data.videos.results;
    let hasTrailer = false;
    let videoSite;
    let videoKey;
    if (videoData.length > 0) {
      hasTrailer = true;
      videoSite = videoData[0].site;
      videoKey = videoData[0].key;
      // TODO search through videos returned and find trailers if present
    }
    return { hasTrailer, imagePath, videoSite, videoKey };
  }
  static fetchSearchResults(searchTerm) {
    return request.get(`${baseURL}/search/multi?query=${searchTerm}&api_key=${apiKey}`)
                  .then((response) => {
                    const searchResultsData = response.body.results;
                    const filteredResults = searchResultsData.filter((searchResult) => {
                      const { media_type } = searchResult;
                      return media_type === 'tv' || media_type === 'movie';
                    });
                    return filteredResults;
                  })
                  .catch(err => err);
  }
  // static popular() {
  //   return superagent.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
  //             .then((response) => {
  //               const popularResultsData = response.body.results;
  //               return popularResultsData.map((popularResultData) => {
  //                 return {
  //                   tmdb_id: popularResultData.id,
  //                   media_type: 'movie',
  //                   title: popularResultData.title,
  //                 };
  //               });
  //             })
  //             .then(response => response.map(trailerData => new TrailerListItem(trailerData)))
  //             .catch(err => err);
  // }
  // static getTrailerInfo(trailerID) {
  //   return superagent
  //     .get(`https://api.themoviedb.org/3/movie/${trailerID}?api_key=${process.env.API_KEY}&append_to_response=videos,credits`)
  //     .then(trailerDetails => trailerDetails.body)
  //     .catch(err => err);
  // }
}

module.exports = TMDB;

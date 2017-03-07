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
                    const filteredResults = TMDB.filterSearchResults(response.body.results);
                    const searchResultData = TMDB.parseSearchData(filteredResults);
                    return searchResultData;
                  })
                  .catch(err => err);
  }
  static filterSearchResults(searchResults) {
    const filteredResults = searchResults.filter((searchResult) => {
      const { media_type } = searchResult;
      return media_type === 'tv' || media_type === 'movie';
    });
    return filteredResults;
  }
  static parseSearchData(searchData) {
    const trailerData = searchData.map((searchResult) => {
      const tmdb_id = searchResult.id;
      const { media_type } = searchResult;
      let title;
      if (media_type === 'movie') {
        title = searchResult.title;
      } else if (media_type === 'tv') {
        title = searchResult.name;
      }
      return { tmdb_id, title, media_type };
    });
    return trailerData;
  }
  static fetchPopularMovies() {
    // TODO fetch TV shows and shuffle in
    return request.get(`${baseURL}/movie/popular?api_key=${apiKey}`)
                  .then((response) => {
                    const popularResults = response.body.results;
                    return popularResults.map((data) => {
                      return {
                        tmdb_id: data.id,
                        title: data.title,
                        media_type: 'movie',
                      };
                    });
                  })
                  .catch(err => err);
  }
  // static getTrailerInfo(trailerID) {
  //   return superagent
  //     .get(`https://api.themoviedb.org/3/movie/${trailerID}?api_key=${process.env.API_KEY}&append_to_response=videos,credits`)
  //     .then(trailerDetails => trailerDetails.body)
  //     .catch(err => err);
  // }
}

module.exports = TMDB;

const TMDB = require('../services/TMDB');

class Trailer {
  static search(searchTerm) {
    return TMDB.fetchSearchResults(searchTerm)
               .then((searchResults) => {
                 const trailers = searchResults.map((searchResult) => {
                   const data = Trailer.parseSearchData(searchResult);
                   return new Trailer(data);
                 });
                 return Promise.all(trailers);
               })
               .then((trailers) => {
                 const trailersWithVideo = trailers.map((trailer) => {
                   return trailer.fetchVideo();
                 });
                 return Promise.all(trailersWithVideo);
               })
               .then(trailersWithVideo => trailersWithVideo.filter(trailer => trailer.hasTrailer))
               .catch(err => err);
  }
  static parseSearchData(searchData) {
    const tmdb_id = searchData.id;
    const { media_type } = searchData;
    let title;
    if (media_type === 'movie') {
      title = searchData.title;
    } else if (media_type === 'tv') {
      title = searchData.name;
    }
    return { tmdb_id, title, media_type };
  }
  constructor({ tmdb_id, title, media_type }) {
    this.tmdbID = tmdb_id;
    this.title = title;
    this.mediaType = media_type;
    this.hasTrailer = null;
    this.imagePath = null;
    this.videoSite = null;
    this.videoKey = null;
  }
  fetchVideo() {
    const { mediaType, tmdbID } = this;
    return TMDB.fetchTrailerData({ mediaType, tmdbID })
        .then(({ hasTrailer, imagePath, videoSite, videoKey }) => {
          this.hasTrailer = hasTrailer;
          this.imagePath = imagePath;
          this.videoSite = videoSite;
          this.videoKey = videoKey;
          return this;
        })
        .catch(err => err);
  }
}

module.exports = Trailer;

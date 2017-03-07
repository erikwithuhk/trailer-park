const TMDB = require('../services/TMDB');

class Trailer {
  static search(searchTerm) {
    return TMDB.fetchSearchResults(searchTerm)
               .then((searchResults) => {
                 const trailers = searchResults.map((data) => {
                   return new Trailer(data);
                 });
                 const trailersWithVideo = trailers.map((trailer) => {
                   return trailer.fetchVideo();
                 });
                 return Promise.all(trailersWithVideo);
               })
               .then(trailersWithVideo => trailersWithVideo.filter(trailer => trailer.hasTrailer))
               .catch(err => err);
  }
  static popularMovies() {
    return TMDB.fetchPopularMovies()
               .then((popularMovies) => {
                //  TODO refactor result handling
                 const trailers = popularMovies.map((data) => {
                   return new Trailer(data);
                 });
                 const trailersWithVideo = trailers.map((trailer) => {
                   return trailer.fetchVideo();
                 });
                 return Promise.all(trailersWithVideo);
               })
               .catch(err => err);
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

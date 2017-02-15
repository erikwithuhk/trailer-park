const TMDB = require('../services/TMDB');

class Trailer {
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

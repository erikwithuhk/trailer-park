const superagent = require('superagent');

class TrailerListItem {
  constructor({ tmdb_id, title, media_type, backdrop_path, hasTrailer, videoSite, videoKey }) {
    this.tmdbID = tmdb_id;
    this.title = title;
    this.mediaType = media_type;
    this.backdrop_path = backdrop_path;
    this.hasTrailer = hasTrailer;
    this.videoSite = videoSite;
    this.videoKey = videoKey;
  }
  getVideoKey() {
    const url = `https://api.themoviedb.org/3/${this.mediaType}/${this.tmdbID}/videos?api_key=${process.env.API_KEY}`;
    return superagent.get(url)
                     .then((response) => {
                       const videoData = response.body.results;
                       if (videoData.length > 0) {
                         this.hasTrailer = true;
                         this.videoSite = videoData[0].site;
                         this.videoKey = videoData[0].key;
                         // TODO search through videos returned and find trailers if present
                         return this;
                       }
                       this.hasTrailer = false;
                       return this;
                     })
                     .catch(err => err);
  }
}

module.exports = TrailerListItem;

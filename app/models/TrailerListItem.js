class TrailerListItem {
  constructor({ tmdb_id, title, media_type, hasTrailer, videoSite, videoKey }) {
    this.tmdbID = tmdb_id;
    this.title = title;
    this.mediaType = media_type;
    this.hasTrailer = hasTrailer;
    this.videoSite = videoSite;
    this.videoKey = videoKey;
  }
}

module.exports = TrailerListItem;

class TrailerListItem {
  constructor({ tmdbID, title, mediaType, hasTrailer, videoSite, videoKey }) {
    this.tmdbID = tmdbID;
    this.title = title;
    this.mediaType = mediaType;
    this.hasTrailer = hasTrailer;
    this.videoSite = videoSite;
    this.videoKey = videoKey;
  }
}

module.exports = TrailerListItem;

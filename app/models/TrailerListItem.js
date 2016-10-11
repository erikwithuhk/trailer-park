class TrailerListItem {
  constructor({ tmdbID, title, mediaType, videoEmbedCode }) {
    this.tmdbID = tmdbID;
    this.title = title;
    this.mediaType = mediaType;
    this.videoEmbedCode = videoEmbedCode;
  }
}

module.exports = TrailerListItem;

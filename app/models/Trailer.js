class Trailer {
  constructor({ tmdbID, title, mediaType, blocked }) {
    this.tmdbID = tmdbID;
    this.title = title;
    this.mediaType = mediaType;
    this.blocked = blocked;
  }
}

module.exports = Trailer;

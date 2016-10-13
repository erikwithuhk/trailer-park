import React, { Component } from 'react';
import request from 'superagent';

const propTypes = {
  userID: React.PropTypes.string,
  trailers: React.PropTypes.array,
  header: React.PropTypes.string,
};

class TrailerCarousel extends Component {
  constructor() {
    super();
    this.state = {
      currentTrailerIndex: 0,
      previousTrailerIndex: 0,
      nextTrailerIndex: 0,
      header: '',
      trailers: [],
    };
    this.getVideoEmbedCode = this.getVideoEmbedCode.bind(this);
    this.handleCarouselButton = this.handleCarouselButton.bind(this);
    this.handleAddTrailer = this.handleAddTrailer.bind(this);
    this.handleBlockTrailer = this.handleBlockTrailer.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      header: nextProps.header,
      trailers: nextProps.trailers,
    });
  }
  getVideoEmbedCode() {
    if (this.state.trailers.length) {
      const currentTrailer = this.state.trailers[this.state.currentTrailerIndex];
      const videoHostDomain = 'https://www.youtube.com/embed/';
      const currentTrailerKey = currentTrailer.videoKey;
      const videoHostOptions = '?autoplay=1&controls=0&showinfo=0&autohide=1';
      const currentTrailerURL = `${videoHostDomain}${currentTrailerKey}${videoHostOptions}`;
      return (
        <iframe
          src={currentTrailerURL}
          frameBorder="0"
          allowFullScreen
        />
      );
    }
    return 'Loading';
  }
  setCurrentTrailer() {
    this.setState({ currentTrailer: this.props.trailers[this.state.currentTrailerIndex] });
  }
  generatePreviousPoster() {
    if (this.state.trailers.length) {
      return (
        <div
          className="trailer_container previous-trailer_container"
          style={{ backgroundImage: `url(\'http://image.tmdb.org/t/p//w500//${this.state.trailers[this.state.previousTrailerIndex].backdrop_path}\')` }}
        />
      );
    }
    return (<div />);
  }
  generateNextPoster() {
    if (this.state.trailers.length) {
      return (
        <div
          className="trailer_container previous-trailer_container"
          style={{ backgroundImage: `url(\'http://image.tmdb.org/t/p//w500//${this.state.trailers[this.state.nextTrailerIndex].backdrop_path}\')` }}
        />
      );
    }
    return (<div />);
  }
  generateTrailerTitle() {
    if (this.state.trailers.length) {
      return `${this.state.trailers[this.state.currentTrailerIndex].title}`;
    }
    return '';
  }
  handleCarouselButton(e) {
    let { previousTrailerIndex, currentTrailerIndex, nextTrailerIndex } = this.state;
    const indices = [previousTrailerIndex, currentTrailerIndex, nextTrailerIndex];
    let nextIndices;
    if (e.target.getAttribute('class') === 'next') {
      nextIndices = this.advanceIndices(indices);
    } else if (e.target.getAttribute('class') === 'prev') {
      nextIndices = this.reverseIndices(indices);
    }
    [previousTrailerIndex, currentTrailerIndex, nextTrailerIndex] = nextIndices;
    const nextState = {
      previousTrailerIndex,
      currentTrailerIndex,
      currentTrailer: this.props.trailers[currentTrailerIndex],
      nextTrailerIndex,
    };
    this.setState(nextState);
  }
  advanceIndices(indices) {
    return indices.map((index) => {
      if (index >= this.props.trailers.length - 1) {
        return 0;
      }
      return index + 1;
    });
  }
  reverseIndices(indices) {
    return indices.map((index) => {
      if (index <= 0) {
        return this.props.trailers.length - 1;
      }
      return index - 1;
    });
  }
  handleAddTrailer(e) {
    e.preventDefault();
    const trailerData = {
      tmdbID: this.state.trailers[this.state.currentTrailerIndex].tmdbID,
      mediaType: this.state.trailers[this.state.currentTrailerIndex].mediaType,
      title: this.state.trailers[this.state.currentTrailerIndex].title,
      blocked: false,
      users_id: this.props.userID,
    };
    request.post(`/api/users/${this.props.userID}/trailers`)
           .send(trailerData)
           .then(() => 'Trailer added!')
           .catch(err => err);
  }
  handleBlockTrailer(e) {
    e.preventDefault();
  }
  render() {
    const videoEmbedCode = this.getVideoEmbedCode(this.state.currentTrailer);
    return (
      <div className="carousel-container">
        <section className="carousel">
          <h3 className="carousel_header" >{this.state.header}</h3>
          <ul className="carousel">
            <li className="previous-trailer_li">
              {this.generatePreviousPoster()}
            </li>
            <li className="current-trailer_li">
              <div className="trailer_container current-trailer_container">
                {videoEmbedCode}
                <button className="heart" onClick={this.handleAddTrailer} />
                <button className="broken-heart" onClick={this.handleBlockTrailer} />
              </div>
              <button className="prev" onClick={this.handleCarouselButton} >&lt;</button>
              <button className="next" onClick={this.handleCarouselButton} >&gt;</button>
            </li>
            <li className="next-trailer_li">
              {this.generateNextPoster()}
            </li>
            <li className="spacer"><div className="spacer-div" >&nbsp;</div></li>
          </ul>
        </section>
        <h4 className="current-trailer_title">{this.state.currentTrailerTitle}</h4>
      </div>
      );
  }
}

TrailerCarousel.propTypes = propTypes;

export default TrailerCarousel;

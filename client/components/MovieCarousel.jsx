import React, { Component } from 'react';

const propTypes = {
  trailers: React.PropTypes.array,
};

class MovieCarousel extends Component {
  constructor() {
    super();
    this.state = {
      currentTrailerIndex: 0,
      previousTrailerIndex: -1,
      nextTrailerIndex: 2,
      currentTrailer: '',
    };
    this.getVideoEmbedCode = this.getVideoEmbedCode.bind(this);
    this.handleCarouselButton = this.handleCarouselButton.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ currentTrailer: nextProps.trailers[this.state.currentTrailerIndex] });
  }
  handleCarouselButton(e) {
    let nextIndices;
    if (e.target.value === 'Next') {
      nextIndices = {
        currentTrailerIndex: this.state.currentTrailerIndex += 1,
        previousTrailerIndex: this.state.previousTrailerIndex += 1,
        nextTrailerIndex: this.state.nextTrailerIndex += 1,
      };
    } else if (e.target.value === 'Prev') {
      nextIndices = {
        currentTrailerIndex: this.state.currentTrailerIndex -= 1,
        previousTrailerIndex: this.state.previousTrailerIndex -= 1,
        nextTrailerIndex: this.state.nextTrailerIndex -= 1,
      };
    }
    this.setState({ nextIndices });
  }
  getVideoEmbedCode() {
    if (this.state.currentTrailer) {
      const videoHostDomain = 'https://www.youtube.com/embed/';
      const currentTrailerKey = this.state.currentTrailer.videoKey;
      const videoHostOptions = '?autoplay=1&controls=0&showinfo=0&autohide=1&start=0';
      const currentTrailerURL = `${videoHostDomain}${currentTrailerKey}${videoHostOptions}`;
      return (
        <iframe
          width="560"
          height="315"
          src={currentTrailerURL}
          frameBorder="0"
          allowFullScreen
        />
      );
    }
    return 'Loading';
  }
  render() {
    // const youTubeUrl = 'https://www.youtube.com/embed/';
    // const movieTrailerKey1 = 's7EdQ4FqbhY';
    // const movieControls = '?autoplay=1&controls=0&showinfo=0&autohide=1&start=30'
    // const movieTrailer = youTubeUrl + movieTrailerKey1 + movieControls;
    // const movieStill = 'http://image.tmdb.org/t/p//w500/';
    // const movieStillBackdropPath = 'mte63qJaVnoxkkXbHkdFujBnBgd.jpg';
    const videoEmbedCode = this.getVideoEmbedCode();
    return (
      <section>
        <ul className="carousel">
          <li className="items main-pos" id="1">
            {videoEmbedCode}
            <div className="heart" />
            <div className="broken-heart" />
          </li>
          <li className="items right-pos" id="2">
            <img
              width="560"
              height="315"
              src="http://image.tmdb.org/t/p//w500//mte63qJaVnoxkkXbHkdFujBnBgd.jpg"
              alt=""
            />
          </li>
          <li className="items back-pos" id="3">
            <iframe width="560" height="315" frameBorder="0" allowFullScreen />
          </li>
          <li className="items back-pos" id="4">
            <iframe width="560" height="315" frameBorder="0" allowFullScreen />
          </li>
          <li className="items back-pos" id="5">
            <iframe width="560" height="315" frameBorder="0" allowFullScreen />
          </li>
          <li className="items back-pos" id="6">
            <iframe width="560" height="315" frameBorder="0" allowFullScreen />
          </li>
          <li className="items left-pos" id="7">
            <img
              src="http://image.tmdb.org/t/p//w500/zkBN7dRpNiK4aaWF6c4WfecyXof.jpg"
              width="560"
              height="315"
              alt=""
            />
          </li>
        </ul>
        <span>
          <input type="button" value="Prev" id="prev" onClick={this.handleCarouselButton} />
          <input type="button" value="Next" id="next" onClick={this.handleCarouselButton} />
        </span>
      </section>
      );
  }
}

MovieCarousel.propTypes = propTypes;

export default MovieCarousel;

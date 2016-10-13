import React, { Component } from 'react';

const propTypes = {
  currentUser: React.PropTypes.object,
  trailers: React.PropTypes.array,
};

class MovieCarousel extends Component {
  constructor() {
    super();
    this.state = {
      currentTrailerIndex: 0,
      previousTrailerIndex: -1,
      nextTrailerIndex: 1,
      currentTrailer: '',
    };
    this.getVideoEmbedCode = this.getVideoEmbedCode.bind(this);
    this.handleCarouselButton = this.handleCarouselButton.bind(this);
    this.handleAddLoveMovie = this.handleAddLoveMovie.bind(this);
    this.handleAddHateMovie = this.handleAddHateMovie.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ currentTrailer: nextProps.trailers[this.state.currentTrailerIndex] });
  }
  getVideoEmbedCode(trailer = this.state.currentTrailer) {
    if (trailer) {
      const videoHostDomain = 'https://www.youtube.com/embed/';
      const currentTrailerKey = trailer.videoKey;
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
  setCurrentTrailer() {
    this.setState({ currentTrailer: this.props.trailers[this.state.currentTrailerIndex] });
  }
  handleCarouselButton(e) {
    let { previousTrailerIndex, currentTrailerIndex, nextTrailerIndex } = this.state;
    const indices = [previousTrailerIndex, currentTrailerIndex, nextTrailerIndex];
    let nextIndices;
    if (e.target.value === 'Next') {
      nextIndices = this.advanceIndices(indices);
    } else if (e.target.value === 'Prev') {
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
  handleAddLoveMovie() {
    console.log(this.props.currentUser.id)
    // request.patch(`/api/trailers/${this.props.currentUser.id}`)
    //        .send(this.state)
    //        .then((response) => {
    //         const updated = response.body;
    //           console.log(updated);
    //          this.setState(updated);
    //   });
  }
  handleAddLoveMovieClick(e) {
    e.preventDefault();
    this.handleAddLoveMovie();
  }
  handleAddHateMovie() {
    // request.patch(`/api/users/${this.props.currentUser.id}`)
    //        .send(this.state)
    //        .then((response) => {
    //         const updated = response.body;
    //           console.log(updated);
    //          this.setState(updated);
    //   });
  }
  handleAddHateMovieClick(e) {
    e.preventDefault();
    this.handleAddHateMovie();
  }
  render() {
    // const movieStill = 'http://image.tmdb.org/t/p//w500/';
    // const movieStillBackdropPath = 'mte63qJaVnoxkkXbHkdFujBnBgd.jpg';
    const videoEmbedCode = this.getVideoEmbedCode(this.state.currentTrailer);
    return (

      <section>
        <ul className="carousel">
          <li className="items main-pos" id="1">
            {videoEmbedCode}
            <div className="heart" onClick={this.handleAddLoveMovieClick} />
            <div className="broken-heart" onClick={this.handleAddLoveMovieClick} />
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

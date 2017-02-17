import React, { Component } from 'react';
import request from 'superagent';

import Trailer from './Trailer.jsx';

const propTypes = {
  header: React.PropTypes.string,
  trailers: React.PropTypes.array,
  userID: React.PropTypes.number,
};

class TrailerCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrailerIndex: 0,
      currentTrailerHeight: '',
    };
    this.handleCarouselButton = this.handleCarouselButton.bind(this);
    this.handleAddTrailer = this.handleAddTrailer.bind(this);
    this.handleBlockTrailer = this.handleBlockTrailer.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  setCurrentTrailer() {
    const currentTrailer = this.props.trailers[this.state.currentTrailerIndex];
    this.setState({ currentTrailer });
  }
  handleResize() {
    const currentTrailerNode = document.querySelector('.current-trailer_li');
    this.setState({ currentTrailerHeight: currentTrailerNode.offsetHeight });
  }
  createPoster(position) {
    if (this.props.trailers.length !== 0) {
      const currentTrailer = this.props.trailers[this.state.currentTrailerIndex];
      const { imagePath } = currentTrailer;
      return (
        <div
          className={`trailer_container ${position}-trailer_container`}
          style={{ backgroundImage: `url(\'http://image.tmdb.org/t/p/w500/${imagePath}\')` }}
        />
      );
    }
    return null;
  }
  createCurrentTrailerTitle() {
    if (this.props.trailers.length) {
      return (
        <h4 className="current-trailer_title" >
          {this.props.trailers[this.state.currentTrailerIndex].title}
        </h4>
      );
    }
    return null;
  }
  handleCarouselButton(e) {
    let { currentTrailerIndex } = this.state;
    switch (e.target.getAttribute('class')) {
      case 'next':
        currentTrailerIndex = this.advanceIndex(currentTrailerIndex);
        break;
      case 'prev':
        currentTrailerIndex = this.reverseIndex(currentTrailerIndex);
        break;
      default:
        break;
    }
    this.setState({ currentTrailerIndex });
  }
  advanceIndex(index) {
    if (index >= this.props.trailers.length - 1) {
      return 0;
    }
    return index + 1;
  }
  reverseIndex(index) {
    if (index <= 0) {
      return this.props.trailers.length - 1;
    }
    return index - 1;
  }
  handleAddTrailer(e) {
    e.preventDefault();
    e.target.setAttribute('class', 'heart liked');
    const trailerData = {
      tmdbID: this.props.trailers[this.state.currentTrailerIndex].tmdbID,
      mediaType: this.props.trailers[this.state.currentTrailerIndex].mediaType,
      title: this.props.trailers[this.state.currentTrailerIndex].title,
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
    const previousPoster = this.createPoster('previous');
    const nextPoster = this.createPoster('next');
    const currentTrailerTitle = this.createCurrentTrailerTitle();
    return (
      <div className="carousel-container">
        <section className="carousel">
          <h3 className="carousel_header" >{this.props.header}</h3>
          <ul className="carousel" style={{ height: `${this.state.currentTrailerHeight}px` }}>
            <li className="previous-trailer_li">
              {previousPoster}
            </li>
            <Trailer
              currentTrailer={this.props.trailers[this.state.currentTrailerIndex]}
              handleCarouselButton={this.handleCarouselButton}
            />
            <li className="next-trailer_li">
              {nextPoster}
            </li>
          </ul>
        </section>
        {currentTrailerTitle}
      </div>
      );
  }
}

TrailerCarousel.propTypes = propTypes;

export default TrailerCarousel;

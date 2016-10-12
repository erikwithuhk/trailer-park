import React, { Component } from 'react';

const propTypes = {

};

class MovieCarousel extends Component {
  render() {
    return (
      <section>
        <ul className="carousel">
          <li className="items main-pos" id="1">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/s7EdQ4FqbhY?autoplay=1&controls=0&showinfo=0&autohide=1&start=30" frameBorder="0" allowFullScreen />
            <div className="heart" />
            <div className="broken-heart" />
          </li>
          <li className="items right-pos" id="2">
            <iframe width="560" height="315" frameBorder="0" allowFullScreen="" />
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
            <iframe width="560" height="315" frameBorder="0" allowFullScreen />
          </li>
        </ul>
        <span>
          <input type="button" value="Prev" id="prev" />
          <input type="button" value="Next" id="next" />
        </span>
      </section>
      );
  }
}

MovieCarousel.propTypes = propTypes;

export default MovieCarousel;


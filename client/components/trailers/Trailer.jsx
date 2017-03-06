import React, { PropTypes } from 'react';

const propTypes = {
  currentTrailer: PropTypes.object,
  handleCarouselButton: PropTypes.func,
  addTrailer: PropTypes.func,
  blockTrailer: PropTypes.func,
};

const Trailer = ({ currentTrailer, handleCarouselButton, addTrailer, blockTrailer }) => {
  let videoEmbed = null;
  if (currentTrailer) {
    videoEmbed = (
      <iframe
        src={`https://www.youtube.com/embed/${currentTrailer.videoKey}?autoplay=1&controls=0&showinfo=0&autohide=1`}
        frameBorder="0"
        allowFullScreen
      />
    );
  }
  return (
    <li className="current-trailer_li">
      <div className="trailer_container current-trailer_container">
        {videoEmbed}
        <button className="heart" onClick={addTrailer} />
        <button className="broken-heart" onClick={blockTrailer} />
      </div>
      <button className="prev" onClick={handleCarouselButton} >&lt;</button>
      <button className="next" onClick={handleCarouselButton} >&gt;</button>
    </li>
  );
};

Trailer.propTypes = propTypes;

export default Trailer;

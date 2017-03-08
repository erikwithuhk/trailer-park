import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Nav from './Nav.jsx';

const propTypes = {
  currentUser: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

const Header = ({ currentUser, signOut }) => {
  return (
    <header className="clearfix">
      <Link to="/" className="logo">
        <div className="image-container">
          <img
            src="images/TrailerParkLogo_main.png"
            alt="Trailer Park Logo"
          />
        </div>
      </Link>
      <Nav currentUser={currentUser} signOut={signOut} />
    </header>
  );
};

Header.propTypes = propTypes;

export default Header;

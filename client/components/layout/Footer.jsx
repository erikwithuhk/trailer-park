import React, { PropTypes } from 'react';

import Nav from './Nav.jsx';

const propTypes = {
  currentUser: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

const Footer = ({ currentUser, signOut }) => {
  return (
    <footer>
      <Nav currentUser={currentUser} signOut={signOut} />
      <p>&copy;2016 Erik J&ouml;nsson, Annie Burns, and Lynn Fleck</p>
    </footer>
  );
};

Footer.propTypes = propTypes;

export default Footer;

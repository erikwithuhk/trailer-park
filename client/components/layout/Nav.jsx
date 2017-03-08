import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  currentUser: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

const Nav = ({ currentUser, signOut }) => {
  if (currentUser.id) {
    return (
      <nav>
        <Link to="/search" >Search</Link>
        <Link to="/community" >Community</Link>
        <Link to="/profile" className="profile" >Profile</Link>
        <Link to="#" onClick={signOut} >Sign out</Link>
      </nav>
      );
  }
  return (
    <nav>
      <Link to="/signup" className="signup" >Sign up</Link>
      <Link to="/login" className="login" >Login</Link>
    </nav>
  );
};

Nav.propTypes = propTypes;

export default Nav;

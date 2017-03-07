import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  currentUser: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

function createUserDisplayElement(props) {
  if (props.currentUser.id) {
    return (
      <div className="top-nav_links">
        <Link to="/search" >Search</Link>
        <Link to="/community" >Community</Link>
        <Link to="/profile" className="profile" >Profile</Link>
        <Link to="#" onClick={props.signOut} >Sign out</Link>
      </div>
      );
  }
  return (
    <div className="top-nav_links">
      <Link to="/signup" className="signup" >Sign up</Link>
      <Link to="/login" className="login" >Login</Link>
    </div>
  );
}

const Nav = (props) => {
  const userDisplayElement = createUserDisplayElement(props);
  return (
    <nav className="top-nav clearfix">
      <Link to="/">
        <img
          className="trailericon"
          src="./images/TrailerParkLogo_main.png"
          alt="trailerparklogo"
        />
      </Link>
      {userDisplayElement}
    </nav>
  );
};

Nav.propTypes = propTypes;

export default Nav;

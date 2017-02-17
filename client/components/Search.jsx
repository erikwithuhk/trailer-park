import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import request from 'superagent';
import TrailerCarousel from './trailers/TrailerCarousel.jsx';

const propTypes = {
  currentUser: PropTypes.object,
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      querySearched: '',
      trailers: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.fetchTrailers();
  }
  fetchTrailers() {
    this.state.searchQuery ? this.fetchSearchQuery() : this.fetchPopularTrailers();
  }
  fetchSearchQuery() {
    const searchQuery = this.state.searchQuery;
    request.get(`/api/trailers/search?q=${searchQuery}`)
           .then((response) => {
             this.setState({
               trailers: response.body,
               querySearched: searchQuery.toUpperCase(),
               searchQuery: '',
             });
           })
           .catch(err => console.error(err));
  }
  fetchPopularTrailers() {
    request.get('/api/trailers/popular')
           .then((response) => {
             this.setState({
               trailers: response.body,
               querySearched: 'Popular Trailers',
             });
           })
           .catch(err => console.error(err));
  }
  setSignupButton() {
    if (!this.props.currentUser) {
      return (
        <Link to="/signup" className="signup-link">
          <button className="signup-button">
            Create a list
          </button>
        </Link>
      );
    }
    return null;
  }
  setWelcomeText() {
    if (!this.props.currentUser) {
      return (
        <div>
          <h1 className="welcome-text">
            Welcome to the <em>Trailer Park</em>!
          </h1>
          <h2>Go ahead, binge-watch those trailers.</h2>
        </div>
      );
    }
    return null;
  }
  handleChange(e) {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.fetchTrailers();
  }
  render() {
    const welcomeText = this.setWelcomeText();
    const signupButton = this.setSignupButton();
    return (
      <div className="search-container">
        {welcomeText}
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            className="search-form_searchbar"
            type="text"
            onChange={this.handleChange}
            placeholder="Search for a movie or TV show"
            value={this.state.searchQuery}
          />
        </form>
        <TrailerCarousel
          header={`Search results for: ${this.state.querySearched}`}
          trailers={this.state.trailers}
          userID={this.props.currentUser ? this.props.currentUser.id : null}
        />
        {signupButton}
      </div>
    );
  }
}

Search.propTypes = propTypes;

export default Search;

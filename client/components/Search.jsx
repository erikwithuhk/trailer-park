import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import request from 'superagent';
import TrailerCarousel from './trailers/TrailerCarousel.jsx';

const propTypes = {
  currentUser: PropTypes.object,
  fetchTrailers: PropTypes.func,
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
  createSignupButton() {
    if (!this.props.currentUser.id) {
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
  createWelcomeText() {
    if (!this.props.currentUser.id) {
      return (
        <div className="welcome-text">
          <h1>
            Welcome to the <em>Trailer Park</em>!
          </h1>
          <p>Go ahead, binge-watch those trailers.</p>
        </div>
      );
    }
    return null;
  }
  fetchTrailers() {
    return this.state.searchQuery ? this.fetchSearchQuery() : this.fetchPopularTrailers();
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
  handleChange(e) {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.fetchTrailers();
  }
  render() {
    const welcomeText = this.createWelcomeText();
    const signupButton = this.createSignupButton();
    return (
      <section className="search">
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
          header={this.state.querySearched}
          fetchTrailers={this.props.fetchTrailers}
          trailers={this.state.trailers}
          userID={this.props.currentUser ? this.props.currentUser.id : null}
        />
        {signupButton}
      </section>
    );
  }
}

Search.propTypes = propTypes;

export default Search;

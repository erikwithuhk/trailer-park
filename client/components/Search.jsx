import React, { Component } from 'react';
import { Link } from 'react-router';
import request from 'superagent';
import jwtDecode from 'jwt-decode';
import TrailerCarousel from './TrailerCarousel.jsx';

const propTypes = {
  token: React.PropTypes.string,
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
    this.getTrailers();
  }
  getTrailers() {
    if (!this.state.searchQuery) {
      this.getPopularTrailers();
    } else {
      this.getSearchQuery();
    }
  }
  getPopularTrailers() {
    request.get('/api/trailers/popular')
           .then((response) => {
             this.setState({
               trailers: response.body,
               querySearched: 'Popular Trailers',
             });
           })
           .catch(err => console.error(err));
  }
  getSearchQuery() {
    request.get(`/api/trailers/search?q=${this.state.searchQuery}`)
           .then((response) => {
             this.setState({ trailers: response.body });
           })
           .catch(err => console.error(err));
  }
  handleChange(e) {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.getTrailers();
    this.setState({
      querySearched: this.state.searchQuery,
      searchQuery: '',
    });
  }
  render() {
    let welcomeText;
    let signupButton;
    if (!this.props.token) {
      welcomeText = (
        <div>
          <h1 className="welcome-text">
            Welcome to the <em>Trailer Park</em>!
          </h1>
          <h2>Go ahead, binge-watch those trailers.</h2>
        </div>
      );
      signupButton = (
        <Link to="/signup" className="signup-link">
          <button className="signup-button">
            Create a list
          </button>
        </Link>
      );
    }
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
          userID={`${this.state.id}`}
        />
        {signupButton}
      </div>
    );
  }
}

Search.propTypes = propTypes;

export default Search;

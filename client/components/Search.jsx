import React, { Component } from 'react';
import { Link } from 'react-router';
import request from 'superagent';
import TrailerCarousel from './TrailerCarousel.jsx';

const propTypes = {
  token: React.PropTypes.string,
}

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: 'hook',
      querySearched: 'Popular Trailers',
      trailers: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.getVideos();
  }
  getVideos() {
    request.get(`/api/trailers?q=${this.state.searchQuery}`)
    .then((response) => {
      this.setState({ trailers: response.body });
    });
  }
  videoComponents() {
    return (
      <div>
        <h1>Videos</h1>
      </div>
    );
  }
  handleChange(e) {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.getVideos();
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
          <h2>Add movies to your list...etc...</h2>
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
        />
        {signupButton}
      </div>
    );
  }
}

Search.propTypes = propTypes;

export default Search;

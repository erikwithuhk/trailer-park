import React, { Component } from 'react';
import request from 'superagent';
import MovieCarousel from './MovieCarousel.jsx';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: 'hook',
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
    this.setState({ searchQuery: '' });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} placeholder="search for a movie or tv show" value={this.state.searchQuery} />
          <input type="submit" value="search" />
        </form>
        <MovieCarousel trailers={this.state.trailers} />
      </div>
    );
  }
}

export default Search;

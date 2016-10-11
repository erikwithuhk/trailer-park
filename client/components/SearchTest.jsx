import React, { Component } from 'react';
import request from 'superagent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: 'hook',
      videos: [],
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
      this.setState({ videos: response.body });
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
    const videoComponents = this.state.videos.map((video, idx) => {
      let videoContent;
      if (video.hasTrailer) {
        if (video.videoSite === 'YouTube') {
          // TODO handle other sites besides Youtube
          videoContent = (
            <iframe key={idx} src={`https://www.youtube.com/embed/${video.videoKey}`} frameBorder="0" allowFullScreen />
          );
        } else {
          videoContent = (<p>{video.title} on {video.videoSite}</p>);
        }
      } else {
        videoContent = (<p>{video.title}</p>);
      }
      return (
        <div key={idx} style={{ height: '15rem' }}>
          {videoContent}
        </div>
      );
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} placeholder="search for a movie or tv show" value={this.state.searchQuery} />
          <input type="submit" value="search" />
        </form>
        {videoComponents}
      </div>
    );
  }
}

export default App;

/**
 * Created by Bruno Bertomeu on 2017-04-07.
 */
'use strict';
import _ from 'lodash';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';

// this key is IP restricted
// If you want to run this locally, create your own YouTube Data API key on https://console.developers.google.com/apis/credentials
const API_KEY = 'AIzaSyAih7xet_f7kqJ7DUr7dYrk1Fxg5mnmT08';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.search('reactjs');
  }

  search(term) {
    YTSearch({key: API_KEY, term: term}, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const search = _.debounce(term => {this.search(term)}, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={search}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector('.container'));
import "./App.css";
import React from "react";

import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        { id: 1, name: "Tiago", artist: "Tiago", album: "Best album" },
        { id: 2, name: "2", artist: "Tiago", album: "Best album" },
      ],
      playlistName: "My playlist",
      playlistTracks: [
        { id: 1, name: "Tiago", artist: "Tiago", album: "Best album" },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find((x) => x.id === track.id) === undefined
    ) {
      console.log("new item");
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track],
      });
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

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
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter((trackToCheck) => {
        return trackToCheck.id !== track.id;
      }),
    });
  }

  updatePlaylistName(newName) {
    this.setState({
      playlistName: newName,
    });
  }

  savePlaylist() {
    let trackUris = this.state.playlistTracks.map((track) => {
      return "spotify:track:" + track.id;
    });
    console.log(trackUris);
  }

  search(searchTerm) {
    console.log(searchTerm);
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
              onSearch={this.search}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

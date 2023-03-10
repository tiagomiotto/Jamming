import "./App.css";
import React from "react";

import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

import { Spotify } from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "My playlist",
      playlistTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find((x) => x.id === track.id) === undefined
    ) {
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track],
        searchResults: this.state.searchResults.filter((trackToCheck) => {
          return trackToCheck.id !== track.id;
        }),
      });
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter((trackToCheck) => {
        return trackToCheck.id !== track.id;
      }),
      searchResults: [track, ...this.state.searchResults],
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
    Spotify.savePlaylist(this.state.playlistName, trackUris);

    this.setState({
      playlistName: "New Playlist",
      playlistTracks: [],
    });
  }

  async search(searchTerm) {
    let spotifySearchResults = await Spotify.search(
      searchTerm,
      this.state.playlistTracks
    );

    this.setState({
      searchResults: spotifySearchResults,
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
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

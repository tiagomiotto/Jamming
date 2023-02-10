import "./Playlist.css";
import React from "react";

import {TrackList} from './../TrackList';

export class Playlist extends React.Component {
  render() {
    return (
      <div class="Playlist">
        <input value="New Playlist" />
        <TrackList />
        <button class="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

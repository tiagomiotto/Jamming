import "./TrackList.css";
import React from "react";

import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  render() {
    const tracksToRender =
      this.props.searchResults !== undefined ? (
        this.props.searchResults.map((track) => (
          <Track track={track} key={track.id} />
        ))
      ) : (
        <div></div>
      );

    return <div className="TrackList">{tracksToRender}</div>;
  }
}

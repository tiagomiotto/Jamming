import "./TrackList.css";
import React from "react";

import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  render() {
    const tracksToRender =
      this.props.tracks !== undefined ? (
        this.props.tracks.map((track) => <Track track={track} key={track.id} />)
      ) : (
        <div></div>
      );

    return <div className="TrackList">{tracksToRender}</div>;
  }
}

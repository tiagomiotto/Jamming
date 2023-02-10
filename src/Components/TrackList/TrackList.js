import "./TrackList.css";
import React from "react";

import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  render() {
    const tracksToRender =
      this.props.tracks !== undefined ? (
        this.props.tracks.map((track) => (
          <Track
            track={track}
            key={track.id}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval}
          />
        ))
      ) : (
        <div></div>
      );

    return <div className="TrackList">{tracksToRender}</div>;
  }
}

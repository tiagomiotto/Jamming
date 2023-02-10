import "./Track.css";
import React from "react";

export class Track extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>TrackName</h3>
          <p>Artist | Album</p>
        </div>
        <button className="Track-action">Action</button>
      </div>
    );
  }
}

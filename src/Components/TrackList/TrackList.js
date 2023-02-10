import "./TrackList.css";
import React from "react";

import {Track} from '../Track/Track'

export class TrackList extends React.Component {
  render() {
    return (
      <div class="TrackList">
       <Track />
      </div>
    );
  }
}

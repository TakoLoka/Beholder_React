import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/rooms/Room.css";

export default class Room extends Component {
  render() {
    return (
      <div className="Room">
        <div className="card card-light card-room">
          <h4 className="card-header text-center">{this.props.roomName}</h4>
          <div className="card-body text-center">
            <p className="card-text">{this.props.description}</p>
            <Link to={"/battlemap/" + this.props.roomId} className="btn btn-light">
              Go to Room
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

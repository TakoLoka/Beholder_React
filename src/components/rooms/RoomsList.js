import React, { Component } from "react";
import Room from "./Room";
import Axios from "axios";

export default class RoomsList extends Component {
  constructor() {
    super();
    this.state = { rooms: [], error: false };
  }
  componentDidMount() {
    Axios.get("http://localhost:50416/api/rooms", {
      headers: { Authentication: localStorage.getItem("access_token") }
    })
      .then(result => {
        return result.data;
      })
      .then(data => {
        this.setState({ ...this.state, rooms: data });
      })
      .catch(err => {
        this.setState({ ...this.state, error: err });
      });
  }
  render() {
    const errorModal = (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Error Modal
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              There was an error when getting a response from the Server
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    return this.state.error ? (
      errorModal
    ) : (
      <div className="RoomList">
        <div className="container-fluid">
          <div className="row">
            {this.state.rooms.length === 0 ? (
              <div className="col-12 text-center">
                There are no rooms present at the moment
              </div>
            ) : (
              this.state.rooms.map(room => {
                return (
                  <div key={room.roomId} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <Room
                      roomName={room.roomName}
                      roomId={room.roomId}
                      description={room.description}
                    ></Room>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }
}

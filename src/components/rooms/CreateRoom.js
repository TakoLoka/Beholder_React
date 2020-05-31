import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import axios from "axios";

export default class CreateRoom extends Component {
  constructor() {
    super();
    this.state = {
      roomName: "",
      description: ""
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  createRoom = () => {
    axios
      .post("http://localhost:50416/api/sockets/rooms", this.state, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({ redirect: "/battlemap/" + data.message });
      })
      .catch(err => {
        const errorData = err.response.data;
        if (errorData && errorData.errors) {
          console.log(errorData.errors);
        } else {
          console.log(errorData);
        }
      });
  };

  render() {
    return this.state.redirect ? (<Redirect to={this.state.redirect} />):(
      <div className="CreateRoom">
        <div className="limiter">
          <div className="container-login100">
            <span className="login100-form-title p-t-20 pb-4">
              Beholder Create Room
            </span>
            <div className="container form-container">
              <div className="wrap-input100 validate-input mb-5">
                <input
                  className="input100"
                  type="text"
                  name="roomName"
                  placeholder="Room Name"
                  value={this.state.roomName}
                  onChange={this.onChange}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-user"></i>
                </span>
              </div>

              <div className="wrap-input100 validate-input mb-5">
                <input
                  className="input100"
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock"></i>
                </span>
              </div>

              <div className="container-login100-form-btn pt-5">
                <button className="login100-form-btn" onClick={this.createRoom}>
                  Create Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

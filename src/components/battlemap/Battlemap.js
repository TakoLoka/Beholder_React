import React, { Component, Fragment } from "react";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import axios from "axios";
import "../../styles/battlemap/Battlemap.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Battlemap extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      allUsers: [],
      message: "",
      messages: [],
      roomId: "",
      roomName: "",
      roomDescription: "",
      hubConnection: null
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sendMessage = () => {
    const message = this.state.message;
    this.state.hubConnection
      .invoke(
        "SendMessage",
        this.state.roomId,
        `${this.props.profile.firstName}: ${message}`
      )
      .catch(err => {
        console.log(err);
      });
    this.setState({ ...this.state, message: "" });
  };

  async componentWillUnmount() {
    if (this.state.hubConnection) {
      await this.state.hubConnection.invoke("LeaveRoom", this.state.roomId);
    }
  }

  componentDidMount() {
    this.setState(
      { ...this.state, roomId: this.props.match.params.roomId },
      () => {
        const connection = new HubConnectionBuilder()
          .withUrl("http://www.takoloka.com/battlemap", {
            accessTokenFactory: () => localStorage.getItem("access_token")
          })
          .configureLogging(LogLevel.Information)
          .build();

        this.setState({ ...this.state, hubConnection: connection }, () => {
          this.state.hubConnection
            .start()
            .then(() => {
              console.log("Connection Established");
            })
            .then(() => {
              connection
                .invoke("JoinRoom", this.state.roomId)
                .then(() => "Joined Room")
                .then(() => {
                  axios
                    .get(
                      "http://www.takoloka.com/api/sockets/rooms/room?roomId=" +
                        this.state.roomId
                    )
                    .then(result => {
                      return result.data;
                    })
                    .then(data => {
                      if (data && data.users) {
                        console.log(data.users);
                        this.setState({
                          ...this.state,
                          roomName: data.roomName,
                          description: data.description,
                          allUsers: [...data.users]
                        });
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    })
                    .catch(err => console.log(err));

                  this.state.hubConnection.on("MESSAGE", receivedMessage => {
                    this.setState({
                      ...this.state,
                      messages: [...this.state.messages, receivedMessage]
                    });
                  });

                  this.state.hubConnection.on(
                    "USER_CONNECTED_ROOM",
                    receivedMessage => {
                      this.setState({
                        ...this.state,
                        messages: [...this.state.messages, receivedMessage]
                      });

                      axios
                        .get(
                          "http://www.takoloka.com/api/sockets/rooms/room?roomId=" +
                            this.state.roomId
                        )
                        .then(result => {
                          return result.data;
                        })
                        .then(data => {
                          if (data && data.users) {
                            this.setState({
                              ...this.state,
                              allUsers: [...data.users]
                            });
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        })
                        .catch(err => console.log(err));
                    }
                  );

                  this.state.hubConnection.on(
                    "USER_CONNECTED_ROOM_ERROR",
                    receivedMessage => {
                      this.setState({
                        ...this.state,
                        messages: [...this.state.messages, receivedMessage]
                      });
                    }
                  );

                  this.state.hubConnection.on(
                    "USER_DISCONNECTED_ROOM",
                    receivedMessage => {
                      this.setState({
                        ...this.state,
                        messages: [...this.state.messages, receivedMessage]
                      });

                      axios
                        .get(
                          "http://www.takoloka.com/api/sockets/rooms/room?roomId=" +
                            this.state.roomId
                        )
                        .then(result => {
                          return result.data;
                        })
                        .then(data => {
                          if (data && data.users) {
                            this.setState({
                              ...this.state,
                              allUsers: [...data.users]
                            });
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        })
                        .catch(err => console.log(err));
                    }
                  );

                  this.state.hubConnection.on(
                    "USER_DISCONNECTED",
                    receivedMessage => {
                      this.setState({
                        ...this.state,
                        messages: [...this.state.messages, receivedMessage]
                      });

                      axios
                        .get(
                          "http://www.takoloka.com/api/sockets/rooms/room?roomId=" +
                            this.state.roomId
                        )
                        .then(result => {
                          return result.data;
                        })
                        .then(data => {
                          if (data && data.users) {
                            this.setState({
                              ...this.state,
                              allUsers: [...data.users]
                            });
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        })
                        .catch(err => console.log(err));
                    }
                  );
                })
                .catch(err => {
                  console.log(err);
                });
            });
        });
      }
    );
  }
  render() {
    const userModel = this.state.allUsers.map((user, key) => (
      <li key={key}>
        <div className="d-flex bd-highlight">
          <div className="img_cont">
            <img
              src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg"
              className="rounded-circle user_img"
            />
            <span className="online_icon online"></span>
          </div>
          <div className="user_info">
            <span>{user.firstName + " " + user.lastName}</span>
          </div>
        </div>
      </li>
    ));

    const messageModel = this.state.messages.map((message, key) => (
      <Fragment>
        <div key={key} className="msg_cotainer">
          {message}
        </div>
        <br></br>
      </Fragment>
    ));

    return !(
      this.props.profile && Object.keys(this.props.profile).length !== 0
    ) ? (
      <Redirect to="/"></Redirect>
    ) : (
      <div className="Battlemap">
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100">
            <div className="col-md-4 col-xl-3 chat">
              <div className="card mb-sm-3 mb-md-0 contacts_card">
                <div className="card-header">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Search..."
                      name=""
                      className="form-control search"
                    />
                    <div className="input-group-prepend">
                      <span className="input-group-text search_btn">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-body contacts_body">
                  <ul className="contacts">{userModel}</ul>
                </div>
                <div className="card-footer"></div>
              </div>
            </div>
            <div className="col-md-8 col-xl-6 chat">
              <div className="card">
                <div className="card-header msg_head">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img
                        src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                        className="rounded-circle user_img"
                      />
                      <span className="online_icon"></span>
                    </div>
                    <div className="user_info">
                      <span>{this.state.roomName}</span>
                      <p>{this.state.description}</p>
                    </div>
                    <div className="video_cam">
                      <span>
                        <i className="fa fa-video"></i>
                      </span>
                      <span>
                        <i className="fa fa-phone"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-body msg_card_body">
                  <div className="justify-content-start mb-4">
                    {messageModel}
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text attach_btn">
                      <i className="fa fa-paperclip"></i>
                    </span>
                  </div>
                  <textarea
                    name="message"
                    className="form-control type_msg"
                    placeholder="Type your message..."
                    value={this.state.message}
                    onChange={this.onChange}
                  ></textarea>
                  <div className="input-group-append">
                    <span
                      className="input-group-text send_btn"
                      onClick={this.sendMessage}
                    >
                      <i className="fa fa-location-arrow"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.data
  };
};

export default connect(mapStateToProps)(Battlemap);

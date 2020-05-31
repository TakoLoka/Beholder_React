import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/auth/Login.js";
import Navbar from "./components/main/Navbar.js";
import Register from "./components/auth/Register.js";
import Battlemap from "./components/battlemap/Battlemap.js";
import RoomsList from "./components/rooms/RoomsList.js";
import "./styles/main/App.css";
import CreateRoom from "./components/rooms/CreateRoom.js";
import store from "./redux/stores/store.js";
import { fetchProfile } from "./redux/actions/userActions.js";
import Profile from './components/user/Profile';
import { Component } from "react";

class App extends Component {
  componentWillMount() {
    if (localStorage.getItem("access_token")) {
      store.dispatch(fetchProfile());
    }
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navbar></Navbar>
          <div className="App">
            <div className="app-container">
              <Switch>
                <Route path="/profile" exact>
                  <Profile></Profile>
                </Route>
                <Route path="/login" exact>
                  <Login />
                </Route>
                <Route path="/register" exact>
                  <Register />
                </Route>
                <Route path="/rooms" exact>
                  <RoomsList />
                </Route>
                <Route path="/createRoom" exact>
                  <CreateRoom />
                </Route>
                <Route path="/battlemap/:roomId" component={Battlemap}></Route>
                <Route path="/" exact></Route>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

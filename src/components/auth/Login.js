import React from "react";
import {Redirect} from 'react-router-dom';
import "../../styles/auth/login/Login.css";
import { connect } from "react-redux";
import { login } from "../../redux/actions/userActions.js";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  login = () => {
    this.props.login(this.state);
  };
  render() {
    return this.props.profile && Object.keys(this.props.profile).length !== 0 ? (<Redirect to="/"></Redirect>):(
      <div className="Login">
        <div className="limiter">
          <div className="container-login100">
            <span className="login100-form-title p-t-20 pb-4">
              Beholder Sign In
            </span>
            <div className="container form-container">
              <div className="wrap-input100 validate-input mb-5">
                <input
                  className="input100"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock"></i>
                </span>
              </div>

              <div className="container-login100-form-btn pt-5">
                <button className="login100-form-btn" onClick={this.login}>
                  Sign In
                </button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(login(credentials))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

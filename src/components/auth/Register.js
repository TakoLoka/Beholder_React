import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import { DateBox } from "devextreme-react";
import {connect} from 'react-redux';
import {register} from '../../redux/actions/userActions';
import "devextreme/dist/css/dx.dark.css";
import "../../styles/auth/register/Register.css";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      birthday: new Date(Date.now()),
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onBdayChanged = event => {
    let newVal = event.value;
    this.setState({ birthday: newVal });
  };
  register = () => {
    axios
      .post("http://www.takoloka.com/api/auth/register", {...this.state, birthday: this.state.birthday.toDateString()}, {
        "Content-Type": "application/json"
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        localStorage.setItem("access_token", data.token);
        this.setState({redirect: '/'});
      })
      .catch(err => {
          const errorData = err.response.data;
          if(errorData && errorData.errors){
            console.log(errorData.errors);
          }else{
              console.log(errorData);
          }
      });
  };
  render() {
    return this.props.profile && Object.keys(this.props.profile).length !== 0 ? (<Redirect to="/"></Redirect>):(
      <div className="register">
        <div className="limiter">
          <div className="container-register100">
            <span className="register100-form-title p-t-20 pb-4">
              Beholder Sign Up
            </span>

            <div className="container form-container">
              <div className="wrap-input100 validate-input mb-3">
                <div className="dx-field">
                  <div className="dx-field-label lbl-birthday">Birthday</div>
                  <div className="dx-field-value">
                    <DateBox
                      type="date"
                      name="birthday"
                      value={this.state.birthday}
                      onValueChanged={this.onBdayChanged}
                    />
                  </div>
                </div>
              </div>
              <div className="wrap-input100 validate-input mb-3">
                <input
                  className="input100"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-pencil"></i>
                </span>
              </div>
              <div className="wrap-input100 validate-input mb-3">
                <input
                  className="input100"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-pencil"></i>
                </span>
              </div>
              <div className="wrap-input100 validate-input mb-3">
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

              <div className="wrap-input100 validate-input mb-3">
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
                  <i className="fa fa-key"></i>
                </span>
              </div>

              <div className="wrap-input100 validate-input mb-3">
                <input
                  className="input100"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock"></i>
                </span>
              </div>

              <div className="container-register100-form-btn pt-5">
                <button
                  className="register100-form-btn"
                  onClick={this.register}
                >
                  Sign Up
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
    login: (credentials) => dispatch(register(credentials))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

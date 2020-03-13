import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../styles/main/Navbar.css";
import { connect } from "react-redux";
import {logout} from '../../redux/actions/userActions.js';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="Navbar navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Beholder
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {this.props.profile && Object.keys(this.props.profile).length !== 0 ? (
              <Fragment>
                <li className="nav-item">
                  <Link to="/createRoom" className="nav-link">
                    Create a Room
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/rooms" className="nav-link">
                    Battlemap
                  </Link>
                </li>
                <li className="nav-item" onClick={this.props.logout}><p className="nav-link">Logout</p></li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </Fragment>
            )}
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li> */}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

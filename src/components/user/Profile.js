import React from "react";
import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const profile = this.props.profile;
    return (
      <div className="container">
        <div className="card card-room">
          <div className="container">
            <div className="row">
              <div className="col-6 text-center">Email:</div>
              <div className="col-6 text-center">Password:</div>
              <hr className="my-4 text-light"></hr>
              <div className="col-6">
                <h3 className="text-center">
                  {profile.firstName} {profile.lastName}
                </h3>
              </div>
              <div className="col-6">
                <h3 className="text-center">{profile.email}</h3>
              </div>
              <hr className="my-5 text-light"></hr>
              <div className="col-12 text-center">
                {!profile.isDM ? (
                  <button className="btn btn-primary col-6 text-center">
                    Become Premium Dungeon Master
                  </button>
                ) : (
                  <button className="btn btn-danger col-6 text-center">
                    Remove Premium Dungeon Master
                  </button>
                )}

                {!profile.isPlayer ? (
                  <button className="btn btn-primary col-6 text-center">
                    Become Premium Player
                  </button>
                ) : (
                  <button className="btn btn-danger col-6 text-center">
                    Remove Premium Player
                  </button>
                )}
              </div>
            </div>
            <hr className="my-2 text-light"></hr>
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
    // becomePremiumDM: () => dispatch(becomePremiumDM(localStorage.getItem('access_token'))),
    // becomePremiumPlayer: () => dispatch(becomePremiumPlayer(localStorage.getItem('access_token')))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

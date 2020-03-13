import types from "./types";
import axios from "axios";

const apiUrl = "http://www.takoloka.com/api";
const userUrl = apiUrl + "/users";

export const fetchProfileData = data => {
  return {
    type: types.FETCH_PROFILE,
    data
  };
};

export const removeProfileData = () => {
  return {
    type: types.REMOVE_PROFILE,
    data: null
  };
};

export const fetchLoginData = () => {
  return {
    type: types.FETCH_LOGIN,
    data: null
  };
};

export const fetchRegisterData = (data) => {
  return {
    type: types.FETCH_REGISTER,
    data
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.setItem("access_token", "");
    dispatch(removeProfileData());
  };
};

export const fetchProfile = () => {
  return dispatch => {
    return axios
      .get(userUrl + "/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
      .then(response => {
        dispatch(fetchProfileData(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const login = credentials => {
  return dispatch => {
    axios
      .post("http://www.takoloka.com/api/auth/login", credentials, {
        "Content-Type": "application/json"
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        localStorage.setItem("access_token", data.token);
        dispatch(fetchProfile());
      });
  };
};

export const register = credentials => {
  return dispatch => {
    axios
      .post("http://www.takoloka.com/api/auth/register", credentials, {
        "Content-Type": "application/json"
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        localStorage.setItem("access_token", data.token);
        dispatch(fetchProfile());
      });
  };
}
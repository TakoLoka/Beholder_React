import types from "../actions/types";

export function userReducer(state = {}, action) {
  switch (action.type) {
    case types.FETCH_PROFILE:
      return action.data;
    case types.REMOVE_PROFILE:
      return action.data;
    case types.FETCH_LOGIN:
      return action.data;
    case types.FETCH_REGISTER:
      return action.data;
    default:
      return state;
  }
}

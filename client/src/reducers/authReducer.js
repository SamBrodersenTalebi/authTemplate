import { SET_CURRENT_USER, USER_LOADING } from '../actions/types';
const isEmpty = require('is-empty');

const initalState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};
const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        token: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default authReducer;

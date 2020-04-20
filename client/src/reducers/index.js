import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

//combine reducers into one rootReducer
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
});

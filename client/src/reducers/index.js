import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notificationReducer from './notificationReducer';

//combine reducers into one rootReducer
export default combineReducers({
  auth: authReducer,
  errors: notificationReducer,
});

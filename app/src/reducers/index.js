import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducers from './user';
import postsReducer from './posts';

const reducers = combineReducers({
  user: userReducers,
  auth: authReducer,
  posts: postsReducer,
});

export default reducers
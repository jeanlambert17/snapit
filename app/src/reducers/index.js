import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducers from './user';
import postsReducer from './posts';
import commentsReducer from './comments';

const reducers = combineReducers({
  user: userReducers,
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

export default reducers
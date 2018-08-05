import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducers from './user';
import postsReducer from './posts';
import commentsReducer from './comments';
import { LOGOUT_SUCCES, LOGIN_SUCCESS } from '../constants/auth';
import { searchReducer } from '../actions/search';
import { usersReducer } from '../actions/users';

const appReducer = combineReducers({
  user: userReducers,
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
  search: searchReducer,
  users: usersReducer
});

const rootReducer = (state, action) => {
  if(action.type === LOGOUT_SUCCES) {
    state = undefined;
  }
  if(action.type === LOGIN_SUCCESS) {
    state.comments = undefined;
  }

  return appReducer(state,action)
}

export default rootReducer;
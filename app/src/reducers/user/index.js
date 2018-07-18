import { combineReducers } from 'redux';
import fieldsReducer from './fields';
import postsReducer from './posts';

const userReducers = combineReducers({
  fields: fieldsReducer,
  posts: postsReducer,
});

export default userReducers;
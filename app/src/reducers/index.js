import { combineReducers } from 'redux';
import authReducer from './auth';
import fieldsReducer from './fields';
import postsReducer from './posts';

const reducers = combineReducers({
  auth: authReducer,
  fields: fieldsReducer,
  posts: postsReducer,
});

export default reducers
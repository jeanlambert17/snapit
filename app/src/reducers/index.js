import { combineReducers } from 'redux';
import authReducer from './auth';
import fieldsReducer from './fields';

const reducers = combineReducers({
  auth: authReducer,
  fields: fieldsReducer,
});

export default reducers
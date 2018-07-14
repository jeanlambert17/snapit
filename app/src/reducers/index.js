import { combineReducers } from 'redux';
import authReducer from './auth';
import fieldsReducer from './fields';

const reducers = combineReducers({
    auth: authReducer,
    field: fieldsReducer,
});

export default reducers
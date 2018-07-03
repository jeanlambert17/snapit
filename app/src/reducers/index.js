import { combineReducers } from 'redux';
import authReducers from './auth'

const reducers = combineReducers({
    auth: authReducers,
});

export default reducers
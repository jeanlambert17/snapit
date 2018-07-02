import { combineReducers } from 'redux';
import userReducers from './user'

const reducers = combineReducers({
    auth: userReducers,
});

export default reducers
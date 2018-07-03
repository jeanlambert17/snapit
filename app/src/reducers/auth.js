import { LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAILURE } from '../constants/auth';

const initialState = {
    user: null,
    fetching: false,
    error: null,
}

export default (state = initialState, action) => {

    switch(action.type) {
        case LOGIN_REQUEST: {
            return {
                type: LOGIN_REQUEST,
                user: null,
                fetching: true,
                error: null,
            }
        }
        case LOGIN_SUCESS: {
            return {
                type: LOGIN_SUCESS,
                user: action.user,
                fetching: false,
                error: null,
            }
        }
        case LOGIN_FAILURE: {
            return {
                type: LOGIN_FAILURE,
                user: null,
                fetching: false,
                error: action.error,
            }
        }
        default: {
            return state;
        }
    }

}
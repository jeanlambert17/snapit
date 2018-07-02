import { LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAILURE } from '../constants/user';

const initialState = {
    user: null,
    fetching: false,
    error: null,
}

export default (state = initialState, action) => {

    switch(action.type) {
        case LOGIN_REQUEST: {
            return {
                type: SIGN_UP,
                user: null,
                fetching: true,
                error: null,
            }
        }
        case LOGIN_SUCESS: {
            return {
                type: LOGGED_IN,
                user: action.user,
                fetching: false,
                error: null,
            }
        }
        case LOGIN_FAILURE: {
            return {
                type: LOGGED_OUT,
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
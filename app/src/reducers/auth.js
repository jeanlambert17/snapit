import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    LOGOUT
} from '../constants/auth';

const initialState = {
    user: null,
    fetching: false,
    
    isAuthenticated: false,
    fetchingAuth: false,

    loginErrorMessage: null,
    signUpErrorMessage: null,
    authErrorMessage: null,
}

export default (state = initialState, action) => {

    switch(action.type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                fetching: true,
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                fetching: false,
                loginErrorMessage: null,
                user: action.user,
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                loginErrorMessage: action.error,
                user: null,
                fetching: false,
            }
        }
        case SIGNUP_REQUEST: {
            return {
                ...state,
                fetching: true,
            }
        }
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                fetching: false,
                user: action.user,
            }
        }
        case SIGNUP_FAILURE: {
            return {
                ...state,
                user: null,
                fetching: false,
                signUpErrorMessage: action.error,
            }
        }
        case LOGOUT: {
            return {                
                ...initialState,
            }
        }
        default: {
            return action;
        }
    }

}
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    LOGOUT_SUCCES, LOGOUT_REQUEST, SET_AUTH,
} from '../constants/auth';

const initialState = {

   user: null,
   token: null,
   fetching: false,
   isLoggedIn: false,

    // No me gusta
   signUpRedirect: false,

   loginError: false,
   signUpError: false,

   loginErrorMessage: null,
   signUpErrorMessage: null,
}

export default (state = initialState, action) => {

   switch(action.type) {
      case LOGIN_REQUEST: {
         return {
            ...state,
            loginError: false,
            loginErrorMessage: null,
            fetching: true,
         }
      }
      case LOGIN_SUCCESS: {
         return {
            ...state,
            fetching: false,
            user: action.user,
            token: action.token,
         }
      }
      case LOGIN_FAILURE: {
         return {
            ...state,
            loginError: true,
            loginErrorMessage: action.error,
            fetching: false,
         }
      }
      case SIGNUP_REQUEST: {
         return {
                ...state,
                signUpErrorMessage: null,
            signUpError: false,
            fetching: true,
         }
      }
      case SIGNUP_SUCCESS: {
         return {
                ...state,
                signUpRedirect: true,
                fetching: false,
         }
      }
      case SIGNUP_FAILURE: {
         return {
                ...state,
                fetching: false,
                signUpError: true,
                signUpErrorMessage: action.error,
         }
      }
      case LOGOUT_REQUEST: {
         return {
                ...state,
                fetching: true,
         }
      }
      case LOGOUT_SUCCES: {
         return {
                ...initialState,
         }
      }
      case SET_AUTH:
         return {
            ...state,
            isLoggedIn: true,
            user: action.user,
            token: action.token,
         }

      default: {
         return state;
      }
   }
}
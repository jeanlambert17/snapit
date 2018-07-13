import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    LOGOUT_SUCCES, LOGOUT_REQUEST, SET_USER_DATA
} from '../constants/auth';

const initialState = {
	
	user: null,
	fetching: false,
	isLoggedIn: false,
	// loginError: false,
	// signUpError: false,
	signUpRedirect: false,

	loginErrorMessage: null,
	signUpErrorMessage: null,
	// authErrorMessage: null,
}

export default (state = initialState, action) => {

   switch(action.type) {
      case LOGIN_REQUEST: {
         return {
				...state,
				loginErrorMessage: null,
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
				signUpErrorMessage: null,
				signUpRedirect: false,
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
				signUpRedirect: false,
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
      case SET_USER_DATA: {
         return {
            ...state,
            isLoggedIn: true,
            user: action.user,
         }
      }
      default: {
         return state;
      }
   }
}
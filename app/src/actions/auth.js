import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    LOGOUT, SET_USER_DATA
} from '../constants/auth';

import fetchLogin from '../api/login';
import fetchSignUp from '../api/signUp';

import { removeItem } from '../helpers/storage';

export function setUserData(user) {
    return {
        type: SET_USER_DATA,
        user,
    }
}

export function login(form) {
   const success = (user) => ({ type: LOGIN_SUCCESS, user });
   const failure = (error) => ({ type: LOGIN_FAILURE, error });
   const request = () => ({ type: LOGIN_REQUEST });
   return dispatch => {
      dispatch(request());
      fetchLogin(form).then(user => {
         dispatch(success(user));
      }).catch(err => {
         dispatch(failure(err));
      });
   }
}

export function signUp(form) {
   console.log(form);
   const success = (user) => ({ type: SIGNUP_SUCCESS, user });
   const failure = (error) => ({ type: SIGNUP_FAILURE, error });
   const request = () => ({ type: SIGNUP_REQUEST });
   return dispatch => {
      dispatch(request());
      fetchSignUp(form).then(user => {
         dispatch(success());
      }).catch(err => {
         dispatch(failure(err));
      })
   }
}

export function logout() {
   return dispatch => {
      removeItem('token').then(() => {
         dispatch({ type: LOGOUT });
      });
   }
}


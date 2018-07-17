import {
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE,
  SIGNUP_REQUEST, 
  SIGNUP_SUCCESS, 
  SIGNUP_FAILURE,
  LOGOUT_REQUEST, 
  LOGOUT_SUCCES, 
  SET_AUTH, 
  SET_USER, 
  SET_TOKEN
} from '../constants/auth';

import fetchLogin from '../api/login';
import fetchSignUp from '../api/signUp';

import { removeItem } from '../helpers/storage';

export function login(form) {
  const success = ({user, token}) => ({ type: LOGIN_SUCCESS, user, token });
  const failure = (error) => ({ type: LOGIN_FAILURE, error });
  const request = () => ({ type: LOGIN_REQUEST });
  return dispatch => {
    dispatch(request());
    fetchLogin(form).then(data => {
        dispatch(success(data));
    }).catch(err => {
        dispatch(failure(err));
    });
  }
}

export function signUp(form) {
  const success = () => ({ type: SIGNUP_SUCCESS });
  const failure = (error) => ({ type: SIGNUP_FAILURE, error });
  const request = () => ({ type: SIGNUP_REQUEST });
  return dispatch => {
    dispatch(request());
    fetchSignUp(form).then(() => {
      dispatch(success());
    }).catch(err => {
      dispatch(failure(err));
    })
  }
}

export function logout() {
  const request = () => ({type:LOGOUT_REQUEST});
  const success = () => ({type:LOGOUT_SUCCES});
  return dispatch => {
    dispatch(request());
    removeItem('token').then(() => {
        dispatch(success());
    });
  }
}

export function setAuth({ user, token }) {
  return {
    type: SET_AUTH,
    user,
    token,
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    user: user
  }
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token: token,
  }
}
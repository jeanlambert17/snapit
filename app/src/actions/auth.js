import { LOGIN_REQUEST, LOGIN_SUCESS, LOGIN_FAILURE } from '../constants/auth';
import fetchLogin from '../api/login';

export function login(form) {
    const success = (user) => ({ type: LOGIN_SUCESS, user });
    const failure = (error) => ({ type: LOGIN_FAILURE, error });
    const request = () => ({ type: LOGIN_REQUEST });
    console.log(form);
    return dispatch => {
        dispatch(request());
        fetchLogin(form).then((user) => {
            dispatch(success(user));
        }).catch((error) => {
            dispatch(failure(error));
        });
    }
}

export function signUp() {
    return dispatch => {

    }
}

export function logout(auth) {
    return dispatch => {

    }
}

export function auth(auth) {
    return dispatch => {

    }
}
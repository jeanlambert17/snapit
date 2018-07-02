import { LOGGED_IN, LOGGED_OUT, IS_AUTH, SIGN_UP, REQUEST_FAILED } from '../../constants/user';

export function login(form) {
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

export function signUp() {
    return dispatch => {
        
    }
}

// Dispatch functions
function doLogin(user) {
    return {
        type: LOGGED_IN,
        user: user,
    }
}
function doSignUp(user) {
    return {
        type: SIGN_UP,
        user: user,
    }
}
function isAuth(user) {
    return {
        type: IS_AUTH,
        user: user,
    }
}
function doLogout() {
    return {
        type: LOGGED_OUT,
    }
}
function requestFailed(error) {
    return {
        type: REQUEST_FAILED,
        errorMessage: error,
    }
}
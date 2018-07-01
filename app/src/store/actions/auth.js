import { LOGGED_IN, LOGGED_OUT, LOGIN_FAILED, IS_AUTH } from '../../constants/auth';

export function login(form) {
    return dispatch => {
        
    }
}

export function logout(auth) {
    return dispatch => {
        
    }
}

export function isAuth(auth) {
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

function doLogout() {
    return {
        type: LOGGED_OUT,
        user: null,
    }
}

function getAuth(user) {
    return {
        type: IS_AUTH,
        user: user,
    }
}

function loginFailed(error) {
    return {
        type: LOGIN_FAILED,
        errorMessage: error,
    }
}
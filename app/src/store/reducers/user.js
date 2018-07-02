import { LOGGED_IN, LOGGED_OUT, IS_AUTH, SIGN_UP, REQUEST_FAILED } from '../../constants/user';

const initialState = {
    user: null,
    errorMessage: null,
}

export default (state = initialState, action) => {

    switch(action.type) {
        case IS_AUTH: {
            return {
                type: IS_AUTH,
                user: action.user,
            }
        }
        case LOGGED_IN: {
            return {
                type: LOGGED_IN,
                user: action.user,
            }
        }
        case SIGN_UP: {
            return {
                type: SIGN_UP,
                user: action.user,
            }
        }
        case LOGGED_OUT: {
            return {
                type: LOGGED_OUT,
                user: null,
            }
        }
        case REQUEST_FAILED: {
            return {
                type: REQUEST_FAILED,
                errorMessage: action.errorMessage,
            }
        }
        default: {
            return state;
        }
    }

}
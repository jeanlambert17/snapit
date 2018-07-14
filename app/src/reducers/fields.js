import {
   UPDATE_FIELD_REQUEST,
   UPDATE_FIELD_SUCCESS,
   UPDATE_FIELD_FAILURE,
   UPDATE_PASSWORD_REQUEST,
   UPDATE_PASSWORD_SUCCESS,
   UPDATE_PASSWORD_FAILURE,
} from '../constants/fields';

const initialState = {
   fetching: false,
   updateFieldError: false,
   updatePasswordError: false,

   updateFieldErrorMessage: '',
   updatePasswordErrorMessage: '',
}

export default (state = initialState, action) => {

   switch(action.type) {
      case UPDATE_FIELD_REQUEST: {
         return {
            ...state,
            fetching: true,
            updateFieldError: false,
            updateFieldErrorMessage: null,
         }
      }
      case UPDATE_FIELD_SUCCESS: {
         return {
            ...state,
            fetching: false,
         }
      }
      case UPDATE_FIELD_FAILURE: {
         return {
            ...state,
            fetching: false,
            updateFieldError: true,
            updateFieldErrorMessage: action.error,
         }
      }
      default: {
         return state;
      }
   }
}

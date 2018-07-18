import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../../constants/user';

const initialState = {
  fetching: false,
  updateError: false,
  updateErrorMessage: '',
}

export default (state = initialState, action) => {

  switch(action.type) {
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        fetching: true,
        updateError: false,
        updateErrorMessage: null,
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        fetching: false,
      }
    }
    case UPDATE_USER_FAILURE: {
      return {
        ...state,
        fetching: false,
        updateError: true,
        updateErrorMessage: action.error,
      }
    }
    default: {
      return state;
    }
  }
}
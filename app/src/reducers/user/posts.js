import {
  POST_REQUEST,
  POST_FAILURE,
  POST_SUCCESS,
} from '../../constants/user';

const initialState = {
  fetching: false,
  addSuccess: false,

  postError: false,
  postErrorMessage: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        ...state,
        postError: false,
        postErrorMessage: null,
        fetching: true,
        addSuccess: false,
      }
    case POST_SUCCESS: 
      return {
        ...state,
        fetching: false,
        addSuccess: true,
      }
    case POST_FAILURE: 
      return {
        ...state,
        fetching: false,
        postError: true,
        postErrorMessage: action.error,
      }
    default: 
      return state
  }
}
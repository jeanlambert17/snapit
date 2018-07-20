import {
  POST_REQUEST,
  POST_FAILURE,
  ADD_POST_SUCCESS,
  GET_POSTS_SUCCESS,
  CLEAN_POSTS
} from '../../constants/user';

const initialState = {
  fetching: false,
  posts: [],
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
    case POST_FAILURE: 
      return {
        ...state,
        fetching: false,
        postError: true,
        postErrorMessage: action.error,
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        fetching: false,
        addSuccess: true,
        posts: [action.post, ...state.posts]
      }
    case GET_POSTS_SUCCESS: 
      return {
        ...state,
        fetching: false,
        posts: action.posts,
      }
    case CLEAN_POSTS:
      return initialState
    default: 
      return state
  }
}
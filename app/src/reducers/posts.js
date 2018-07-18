import {
  HOME_POSTS_REQUEST,
  HOME_POSTS_SUCCESS,
  HOME_POSTS_FAILURE
} from '../constants/posts';

const initialState = {
  fetching: false,
  page: 1,
  posts: [],
  error: false,
  errorMessage: '',
}

export default (state = initialState, action) => {
  switch(action.type) {
    case HOME_POSTS_REQUEST: 
      return {
        ...state,
        fetching: true,
      }
    case HOME_POSTS_SUCCESS:
      return {
        ...state,
        page: state.page + 1,
        posts: [...state.posts, ...action.posts],
        fetching: false,
      }
    case HOME_POSTS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: true,
        errorMessage: action.error,
      }
    default: 
      return state;
  }
}
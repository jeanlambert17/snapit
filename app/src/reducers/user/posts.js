import {
  POST_REQUEST,
  POST_FAILURE,
  ADD_POST_SUCCESS,
  GET_POSTS_SUCCESS,
  CLEAN_POSTS,
  USER_LIKE_REQUEST,
  USER_LIKE_FAILURE,
  USER_LIKE_SUCCESS
} from '../../constants/user';

const initialState = {
  fetching: false,
  posts: [],

  likeFetching: false,

  addSuccess: false,

  error: false,
  errorMessage: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LIKE_REQUEST:
      return {
        ...state,
        likeFetching: true,
      }
    case USER_LIKE_FAILURE:
      return {
        ...state,
        likeFetching: false,
        error: true,
        errorMessage: action.error,
      }
    case USER_LIKE_SUCCESS:
      const postId = action.postId;
      return {
        ...state,
        posts: state.posts.map(post => post._id === postId ? { ...post, hasLiked: !post.hasLiked } : post),
        likeFetching: false,
      }
    case POST_REQUEST:
      return {
        ...state,
        error: false,
        errorMessage: null,
        fetching: true,
        addSuccess: false,
      }
    case POST_FAILURE: 
      return {
        ...state,
        fetching: false,
        error: true,
        errorMessage: action.error,
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
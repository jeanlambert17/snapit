import {
  POST_COMMENTS,
  COMMENTS_REQUEST,
  COMMENTS_FAILURE,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS
} from '../constants'

const initialState = {
  posts: [],
  comments: [],
  errorMessage: '',
  error: false,
  fetching: false,
}
export default (state = initialState, action) => {

  switch (action.type) {
    case POST_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      }
    case COMMENTS_REQUEST:
      return {
        ...state,
        fetching: true,
        error: false,
        errorMessage: '',
      }
    case COMMENTS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: true,
        errorMessage: action.error,
      }
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        posts: [{ id: action.postId, comments: action.comments}, ...state.posts],
        comments: action.comments
      }
    case ADD_COMMENT_SUCCESS: {
      const comments = [action.comment, ...state.comments];
      return {
        ...state,
        fetching: false,
        posts: state.posts.map(p => p.id === action.postId ? { ...p, comments: comments } : p),
        comments: comments
      }
    }
    case DELETE_COMMENT_SUCCESS: {
      const comments = state.comments.filter(c => c._id !== action.commentId);
      return {
        ...state,
        fetching: false,
        comments: comments,
        posts: state.posts.map(p => p.id === action.postId ? { ...p, comments: comments } : p )
      }
    }
    default:
      return state;
  }
}
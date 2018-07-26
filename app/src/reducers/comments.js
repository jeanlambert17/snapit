import {
  SET_CURRENT_COMMENTS,
  COMMENTS_REQUEST,
  COMMENTS_FAILURE,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS
} from '../constants/comments'

// Selectors
export const postComments = state => {
  // if(state.fetching) {
  //   return [];
  // } else {
    const comments = state.posts.find(post => post.id === state.currentPost);
    return comments ? comments.comments : []
  // }
}

const initialState = {
  posts: [],
  currentPost: '',
  fetching: false,

  getCommentsSuccess: false,
  addCommentSuccess: false,
  deleteCommentSuccess: false,

  errorMessage: '',
  error: false,
}
export default (state = initialState, action) => {

  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        fetching: true,
        addCommentSuccess: false,
        getCommentsSuccess: false,
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
        currentPost: action.postId,
        getCommentsSuccess: true
      }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        fetching: false,
        posts: state.posts.map(p => {
          return p.id === action.postId 
            ? { ...p, comments: [...p.comments, action.comment] } 
            : p
        }),
        addCommentSuccess: true,
      }
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        fetching: false,
        posts: state.posts.map(p => p.id === action.postId ? { ...p, comments: p.comments.filter(c => c._id !== action.commentId) } : p )
      }
    case SET_CURRENT_COMMENTS:
      return {
        ...state,
        fetching: false,
        currentPost: action.postId
      }
    default:
      return state;
  }
}
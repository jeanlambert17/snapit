import {
  HOME_POSTS_REQUEST,
  HOME_POSTS_SUCCESS,
  HOME_POSTS_FAILURE,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  GET_HOME_POSTS,
  EMPTY_HOME_POSTS,
} from '../constants/posts';

const initialState = {
  fetching: false,
  isEmpty: false,

  likeFetching: false,
  likeSuccess: false,
  
  posts: [],
  currentPosts: [],
  page: 1,
  perPage: 5,

  error: false,
  errorMessage: '',
}

export default (state = initialState, action) => {
  switch(action.type) {
    case HOME_POSTS_REQUEST: 
      return {
        ...state,
        fetching: true,
        isEmpty: false,        
      }
    case HOME_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        fetching: false,
        page: 1,
        currentPosts: [],
      }
    case HOME_POSTS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: true,
        errorMessage: action.error,
      }
    case LIKE_POST_REQUEST:
      return {
        ...state,
        likeFetching: true,
        likeSuccess: false,
        error: false,
      }
    case LIKE_POST_SUCCESS:
      const postId = action.postId;
      return {
        ...state,
        posts: state.posts.map(post => post._id === postId ? { ...post, hasLiked: !post.hasLiked} : post),
        currentPosts: state.currentPosts.map(post => post._id === postId 
          ? { 
            ...post, 
            hasLiked: !post.hasLiked, 
            likes: post.likes + (!post.hasLiked ? 1 : -1)
          } : post),
        likeFetching: false,
        likeSuccess: true,
      }
    case LIKE_POST_FAILURE:
      return {
        ...state,
        likeFetching: false,
        error: true,
        errorMessage: action.error
      }
    case GET_HOME_POSTS: {
      let { posts, page, perPage } = state;
      let initialPage = (page - 1) * perPage;
      let finalPage = initialPage + perPage;
      let currentPosts = posts.slice(initialPage, finalPage);
      return {
        ...state,
        currentPosts: [...state.currentPosts, ...currentPosts],
        page: page + 1,
      }
    }
    case EMPTY_HOME_POSTS: {
      return {
        ...state,
        isEmpty: true,
      }
    }
    default: 
      return state;
  }
}
import {
  HOME_POSTS_REQUEST,
  HOME_POSTS_SUCCESS,
  HOME_POSTS_FAILURE,
  GET_HOME_POSTS,
  EMPTY_HOME_POSTS
} from '../constants/posts';

const initialState = {
  fetching: false,
  isEmpty: false,

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
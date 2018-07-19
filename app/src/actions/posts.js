import {
  HOME_POSTS_REQUEST,
  HOME_POSTS_SUCCESS,
  HOME_POSTS_FAILURE,
  GET_HOME_POSTS,
  EMPTY_HOME_POSTS
} from '../constants/posts';
import fetchGetPosts from '../api/getPosts';

const request = () => ({ type: HOME_POSTS_REQUEST });
const success = (posts) => ({ type: HOME_POSTS_SUCCESS, posts });
const failure = (error) => ({ type: HOME_POSTS_FAILURE, error });
const morePosts = () => ({ type: GET_HOME_POSTS });
const emptyPosts = () => ({ type: EMPTY_HOME_POSTS })

export function fetchPosts() {
  console.log('fetching posts')
  return async (dispatch) => {
    dispatch(request());
    try {
      const posts = await fetchGetPosts();
      if(posts) {
        dispatch(success(posts));
        console.log(posts.length)
        if (posts.length > 0)
          dispatch(morePosts());
        else 
          dispatch(emptyPosts());        
      }
    } catch(err) {
      dispatch(failure(err));
    }
  }
}

export const getPosts = () => {
  console.log('get posts')
  return (dispatch, getState) => {
    const { posts: { posts, currentPosts } } = getState();
    if(currentPosts.length === posts.length)
      dispatch(emptyPosts());
    else 
      dispatch(morePosts());
  }
}
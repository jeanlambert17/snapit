import {
  HOME_POSTS_REQUEST,
  HOME_POSTS_SUCCESS,
  HOME_POSTS_FAILURE,
  GET_HOME_POSTS,
  EMPTY_HOME_POSTS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  USER_POSTS_REQUEST,
  USER_POSTS_FAILURE,
  USER_POSTS_SUCCESS
} from '../constants/posts';
import {
  like,
  getPosts as gp, 
  get
} from '../api/posts';

const morePosts = () => ({ type: GET_HOME_POSTS });
const emptyPosts = () => ({ type: EMPTY_HOME_POSTS })

export function fetchPosts() {
  const request = () => ({ type: HOME_POSTS_REQUEST });
  const success = (posts) => ({ type: HOME_POSTS_SUCCESS, posts });
  const failure = (error) => ({ type: HOME_POSTS_FAILURE, error });

  return async (dispatch,getState) => {
    dispatch(request());
    const { auth: { token } } = getState();
    try {
      const posts = await gp(token);      
      if (posts) {
        dispatch(success(posts));
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
  return (dispatch, getState) => {
    const { posts: { posts, currentPosts } } = getState();
    if(currentPosts.length === posts.length)
      dispatch(emptyPosts());
    else 
      dispatch(morePosts());
  }
}

export const likePost = (postId) => {
  return async (dispatch, getState) => {
    dispatch({ type: LIKE_POST_REQUEST });
    const { auth: { token }} = getState();
    try {
      const _like = await like({postId},token);
      if(_like) {
        dispatch({ type: LIKE_POST_SUCCESS, postId });
      }
    } catch(error) {
      dispatch({ type: LIKE_POST_FAILURE, error });
    }
  }
}

export const userPosts = (userId) => {
  return async (dispatch,getState) => {
    dispatch({ type: USER_POSTS_REQUEST });
    const { auth: { token }} = getState();
    try {
      const posts = await get(userId,token);
      if(posts) {
        dispatch({ type: USER_POSTS_SUCCESS, usersPosts: posts });
      }
    } catch(err) {
      dispatch({ type: USER_POSTS_FAILURE, error: err });
    }
  }
}
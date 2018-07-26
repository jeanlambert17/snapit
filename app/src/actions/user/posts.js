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

import { addUserPost, getUserPosts, likePost as fetchLike } from '../../api/posts';

const request = () => ({ type: POST_REQUEST });
const failure = (error) => ({ type: POST_FAILURE, error });


export const likePost = (postId) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_LIKE_REQUEST });
    const { auth: { token } } = getState();
    try {
      const like = await fetchLike({ postId }, token);
      if (like) {
        dispatch({ type: USER_LIKE_SUCCESS, postId });
      }
    } catch (error) {
      dispatch({ type: USER_LIKE_FAILURE, error });
    }
  }
}

export function addPost(form) {
  const sucess = (post) => ({ type: ADD_POST_SUCCESS, post })
  return async (dispatch, getState) => {
    dispatch(request());
    const { auth: { token }} = getState();
    try {
      let post = await addUserPost(form,token);
      if(post) {
        dispatch(sucess(post))
      }
    } catch(err) {
      dispatch(failure());
    }
  }
}

export function getPosts() {
  const success = (posts) => ({ type: GET_POSTS_SUCCESS, posts})
  return async (dispatch, getState) => {
    const { auth: { token }} = getState();
    try {
      const posts = await getUserPosts(token);
      if(posts) {
        dispatch(success(posts));
      }
    } catch (err) {
      dispatch(failure(err))
    }
  }
}

export function cleanPosts() {
  return {
    type: CLEAN_POSTS
  }
}
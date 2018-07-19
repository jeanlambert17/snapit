import {
  POST_REQUEST,
  POST_FAILURE,
  ADD_POST_SUCCESS,
  GET_POSTS_SUCCESS,
} from '../../constants/user';

import { addUserPost, getUserPosts } from '../../api/addPost';

const request = () => ({ type: POST_REQUEST });
const failure = (error) => ({ type: POST_FAILURE, error });

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
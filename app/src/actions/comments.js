import {
  COMMENTS_REQUEST,
  COMMENTS_FAILURE,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  SET_CURRENT_COMMENTS
} from '../constants/comments'
import { 
  getComments as fetchGet, 
  addComment as fetchAdd,
  deleteComment as fetchDelete
} from '../api/comments';

const request = () => ({ type: COMMENTS_REQUEST });
const failure = (error) => ({ type: COMMENTS_FAILURE, error });

export const setCurrentComments = postId => {
  return {
    type: SET_CURRENT_COMMENTS,
    postId: postId,
  }
}

export const getComments = (postId) => {
  const success = (postId,comments) => ({ type: GET_COMMENTS_SUCCESS, postId, comments });
  return async (dispatch, getState) => {
    dispatch(request());
    const { comments: { posts }, auth: { token } } = getState();
    let alreadyFetch = posts.some(c => c.id === postId);
    if(!alreadyFetch) {      
      try {
        const _comments = await fetchGet(postId,token);
        dispatch(success(postId, _comments));
      } catch (err) {
        dispatch(failure(err));
      }
    } else {
      dispatch(setCurrentComments(postId));
    }
  }
}

export const addComment = (postId,form) => {
  const success = (postId,comment) => ({ type: ADD_COMMENT_SUCCESS, postId, comment });
  return async (dispatch, getState) => {
    dispatch(request());
    const { auth: { token } } = getState();
    try {
      const comment = await fetchAdd(form,token);
      dispatch(success(postId,comment));
    } catch(err) {
      dispatch(failure(err));
    }
  }
}

export const deleteComment = (postId,commentId) => {
  const success = (postId,commentId) => ({type: DELETE_COMMENT_SUCCESS, postId, commentId });
  return async (dispatch, getState) => {
    dispatch(request());
    const { auth: { token }} = getState();
    try {
      await fetchDelete({ commentId }, token);
      dispatch(success(postId,commentId));
    } catch(err) {
      dispatch(failure(err));
    }
  }
}
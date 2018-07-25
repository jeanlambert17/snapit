import {
  POST_COMMENTS,
  COMMENTS_REQUEST,
  COMMENTS_FAILURE,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS
} from '../constants'
import { 
  getComments as fetchGet, 
  addComment as fetchAdd,
  deleteComment as fetchDelete
} from '../api/comments';

const request = () => ({ type: COMMENTS_REQUEST });
const failure = (error) => ({ type: COMMENTS_FAILURE, error });

export const getComments = (postId) => {
  const success = (postId,comments) => ({ type: GET_COMMENTS_SUCCESS, postId, comments });
  return async (dispatch, getState) => {
    dispatch(request());
    const { comments: { comments }, auth: { token } } = getState().comments.comments;
    let alreadyFetch = comments.find(c => c.postId === postId);
    if(!alreadyFetch) {      
      try {
        const _comments = await fetchGet(postId,token);
        dispatch(success(postId, _comments));        
      } catch (err) {
        dispatch(failure(err));
      }
    } else {
      dispatch(postComments(alreadyFetch));
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
      dispach(failure());
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

export const postComments = (comments) => {
  return {
    type: POST_COMMENTS,
    comments
  }
}
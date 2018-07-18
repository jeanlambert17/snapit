import {
  HOME_POSTS_REQUEST,
  HOME_POSTS_SUCCESS,
  HOME_POSTS_FAILURE
} from '../constants/posts';
import fetchGetPosts from '../api/getPosts';

const request = () => ({ type: HOME_POSTS_REQUEST });
const success = (posts) => ({ type: HOME_POSTS_SUCCESS, posts });
const failure = (error) => ({ type: HOME_POSTS_FAILURE, error });

export function getPosts(perPage) {
  return async (dispatch, getState) => {
    dispatch(request());
    const page = getState().posts.page;
    try {
      const posts = await fetchGetPosts(page,perPage);
      if(posts) {
        dispatch(success(posts));
      }
    } catch(err) {
      dispatch(failure(err));
    }
  }
}
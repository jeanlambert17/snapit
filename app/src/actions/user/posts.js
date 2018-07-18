import {
  POST_REQUEST,
  POST_FAILURE,
  POST_SUCCESS,
} from '../../constants/user';

import fetchAddPost from '../../api/addPost';

const request = () => ({ type: POST_REQUEST });
const failure = (error) => ({ type: POST_FAILURE, error });
const sucess = () => ({ type: POST_SUCCESS })

export function addPost(form) {
  return async (dispatch, getState) => {
    dispatch(request());
    const { auth: { token }} = getState();
    try {
      let post = await fetchAddPost(form,token);
      if(post) {
        dispatch(sucess())
      }
    } catch(err) {
      dispatch(failure());
    }
  }
}

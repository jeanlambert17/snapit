import { createFetchPattern } from '../utils/createReducer';
import fetchApi from '../utils/fetchApi';

const LIKE_POST = 'LIKE_POST';

export const fakeLike = (postId) => {
  return {
    type: LIKE_POST,
    postId
  }
}

export const get = async (id, token) => {
  const options = {
    method: 'get',
    endpoint: '/post/get/' + id,
    headers: {
      'x-access-token': token
    }
  }
  try {
    const posts = await fetchApi(options)
    return posts;
  } catch (err) {
    throw err;
  }
}

const actionHandlers = {
  [LIKE_POST]: (state,action) => ({ ...state,
    data: state.data.map(post => post._id === action.postId
      ? {
        ...post,
        hasLiked: !post.hasLiked,
        likes: post.likes + (!post.hasLiked ? 1 : -1)
      } : post),
  })
}

const { action, reducer } = createFetchPattern('USER_POSTS', get, actionHandlers);

export { action as userPosts, reducer as usersReducer }
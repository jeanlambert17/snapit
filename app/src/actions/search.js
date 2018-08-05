import { createFetchPattern } from '../utils/createReducer';
import fetchApi from '../utils/fetchApi';

const search = async (param,token) => {
  const options = {
    method: 'get',
    endpoint: '/post/getByTag/' + param,
    headers: {
      'x-access-token': token
    }
  }
  try {
    const posts = await fetchApi(options)
    return posts;
  } catch(err) {
    throw err;
  }
}
const { action, reducer } = createFetchPattern('SEARCH', search);

export { action as searchPosts, reducer as searchReducer }
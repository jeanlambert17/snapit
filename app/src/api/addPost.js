import fetchApi from '../helpers/fetchApi';

export const addUserPost = async (form,token) => {
  const options = {
    method: 'post',
    endpoint: '/post/add',
    formdata: true,
    data: form,
    headers: {
      'x-access-token': token,
    },
  }
  try {
    const post = await fetchApi(options);
    return post;
  } catch(err) {
    return err;
  }
}

export const getUserPosts = async (token) => {
  const options = {
    method: 'get',
    endpoint: '/user/posts',
    headers: {
      'x-access-token': token
    }
  }
  try {
    const posts = await fetchApi(options);
    return posts;
  } catch(err) {
    throw err;
  }
}
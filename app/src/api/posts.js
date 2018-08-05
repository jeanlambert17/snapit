import fetchApi from '../utils/fetchApi';

export const add = async (form,token) => {
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
export const like = async (form, token) => {
  const options = {
    method: 'post',
    endpoint: '/like/do',
    data: form,
    headers: {
      'x-access-token': token
    }
  }
  try {
    const like = await fetchApi(options);
    return like;
  } catch (err) {
    throw err;
  }
}
export const getPosts = async (token = null) => {
  const options = {
    method: 'get',
    endpoint: '/post/get',
  }
  if (token) {
    options.headers = {
      'x-access-token': token,
    }
  }
  try {
    const posts = fetchApi(options)
    return posts;
  } catch (err) {
    throw err;
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
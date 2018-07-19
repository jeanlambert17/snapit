import fetchApi from '../helpers/fetchApi';

export const addUserPost = async (form,token) => {
  let fd = new FormData();
  let keys = Object.keys(form);
  keys.forEach(key => {
    fd.append(key,form[key]);
  });
  const options = {
    method: 'post',
    endpoint: '/post/add',
    data: fd,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    token,
  }
  try {
    const post = await fetchApi(options);
    return post;
  } catch(err) {
    return err;
  }
}

export const getUserPosts = async (token) => {
  try {
    const posts = await fetchApi({ method: 'get', token, endpoint: '/user/posts' });
    return posts;
  } catch(err) {
    throw err;
  }
}
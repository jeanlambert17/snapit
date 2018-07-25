import fetchApi from '../helpers/fetchApi';

export const getComments = async (id, token = null) => {
  let options = {
    method: 'get',
    endpoint: '/comment/get/' + id,
  }
  if(token) {
    options.header = {
      'x-access-token': token
    }
  }
  console.log('get comments options');
  console.log(options);
  try {
    let comment = await fetchApi(options)
    return comment;
  } catch(err) {
    throw err;
  }
}

export const addComment = async (form,token) => {
  const options = {
    method: 'post',
    endpoint: '/comment/add',
    data: form,
    header: {
      'x-access-token':token
    }
  }
  try {
    let comments = await fetchApi(options);
    return comments;
  } catch(err) {
    throw err;
  }
}

export const deleteComment = async (form,token) => {
  const options = {
    method: 'delete',
    endpoint: '/comment/delete',
    data: form,
    header: {
      'x-access-token': token
    }
  }
  try {
    let res = await fetchApi(options);
    return res;
  } catch(err) {
    throw err;
  }
}
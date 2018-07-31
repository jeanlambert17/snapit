import { getItem, setItem } from '../utils/storage';
import fetchApi from '../utils/fetchApi';

export const auth = async () => {
  try {
    const token = await getItem('token');
    const options = {
      method: 'get',
      headers: {
        'x-access-token': token,
      },
      endpoint: '/user/auth'
    }
    if(token) {
      let user = await fetchApi(options);
      return { token, user }
    } else
      return null;
  } catch(err) {
    throw err;
  }
}

export const login = async (form) => {
  const options = {
    method: 'post',
    endpoint: '/user/login',
    data: form,
  }

  try {
    const data = await fetchApi(options);
    await setItem('token', data.token);
    return data;
  } catch (err) {
    throw err;
  }
}
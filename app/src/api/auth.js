import { getItem } from '../utils/storage';
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
      console.log(user)
      return { token, user }
    } else
      return null;
  } catch(err) {
    throw err;
  }
}
import { getItem } from './storage';
import configs from './configs';

export default fetchApi = async ({ endPoint, method, headers = {}, body = null }) => {
   try {
      const token = await getItem('token');

      return fetch(`url${endPoint}`, {
         method,
         credentials: 'include',
         headers: {
            'x-access-token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers,
         },
         ...body,
      }).then(res => res.json());
   } catch(err) {
      throw err;
   }
}
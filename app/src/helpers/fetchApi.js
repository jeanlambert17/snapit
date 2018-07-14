import { getItem } from './storage';
import configs from './configs';

export default fetchApi = async ({ endPoint, method, headers = {}, body = null }) => {
   try {
      const token = await getItem('token');

      if(token) 
         return fetch(configs.url+endPoint, {
            method: method,
            credentials: 'include',
            headers: {
               'x-access-token': token,
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               ...headers,
            },
            body: (body === null) ? null : JSON.stringify(body),
         });
      return null;
   } catch(err) {
      throw err;
   }
}
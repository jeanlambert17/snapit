import { API_URL } from '../helpers/configs';
import { getItem } from '../helpers/storage';

export default async () => {
   try {
      const token = await getItem('token');
      // let auth;
      if(token)
         return fetch(`${API_URL}/user/userData`, {
            method: 'GET',
            headers: {
               'x-access-token': token,
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            credentials: 'include',
         }).then(res => res.json()).then(({ status, body }) => {            
            console.log('status: ' + status)
            console.log('body: ' + body);
            return (status === 200) ? {token, user: body} : null;
         }).catch(error => {
            console.log('UserData error: ' + error);
            return null;
         }) 
      return null;
   } catch(err) {
      console.log('Error in isAuth: ' + err);
      return null
   }
}
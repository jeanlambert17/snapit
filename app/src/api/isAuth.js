import configs from './configs';
import { getItem } from '../helpers/storage';

export default async () => {
   try {
      const token = await getItem('token');
      // let auth;
      if(token) 
         return fetch(`${configs.url}/user/userData`, {
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
            return (status === 200) ? body : null;
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
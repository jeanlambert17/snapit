import configs from './configs';
import { getItem } from '../helpers/storage';

export default () => {
   return new Promise((res, rej) => {
      getItem('token')
      .then(token => {
         fetch(`${configs.url}/user/userData`, {
            method: 'GET',
            headers: {
               'x-access-token': token,
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            credentials: 'include',
         }).then(response => response.json()).then(({ status, body }) => {
            console.log('userData status: ' + status);
            console.log('userData body: ' + JSON.stringify(body));
            (status === 200 ? res(body) : rej(body));
         }).catch(error => {
            console.log('UserData error: ' + error);
            rej('Networking problem');
         });
      }).catch(err => {
         rej(err);
      });
   })
}
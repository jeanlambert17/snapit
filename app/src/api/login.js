import { setItem } from '../helpers/storage';
import configs from './configs';

export default (form) => {
   return new Promise((res,rej) => {        
      fetch(`${configs.url}/user/login`, {
         method: 'POST',
         headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
         },
         credentials: 'include',
         body: JSON.stringify(form),
      }).then(response => response.json()).then(({ status, body, token }) => {            
         console.log('Login status: ' + status);
         console.log('Login body: ' + JSON.stringify(body));
         setItem('token', token); // Mejorar esto
         (status === 200 ? res(body) : rej(body));
      }).catch(error => {
         console.log('Login error: ' + error);
         rej(error);
      });
   })
}
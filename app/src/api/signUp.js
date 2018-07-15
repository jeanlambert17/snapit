import { API_URL } from '../helpers/configs';

export default (form) => new Promise((res,rej) => 
   fetch(`${API_URL}/user/signUp`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(form),
   }).then(response => response.json()).then(({status,body}) => {
      console.log('Sign up status: ' + status);
      console.log('Sign up body: ' + JSON.stringify(body));
      if(status === 200)
         res(body)
      else 
         rej(body)
   }).catch(error => {
      console.log('Sign up error: ' + error);
      rej('Networking problem');
   })
)

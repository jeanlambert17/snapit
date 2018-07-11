import configs from './configs';

export default (form) => {
   console.log('fetch sign up!');
   return new Promise((res, rej) => {
      fetch(`${configs.url}/user/signUp`, {
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
         (status === 200 ? res(body) : rej(body));
      }).catch(error => {
         console.log('Sign up error: ' + error);
         rej('Networking problem');
      });
   })
}
import { API_URL } from '../helpers/configs';
import { getItem } from '../helpers/storage';

export default async () => {
  try {
    const token = await getItem('token');    
    if(token) {
      const options = {
        method: 'GET',
        headers: {
          'x-access-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      }
      return fetch(API_URL + '/user/auth', options).then(res => res.json())
      .then((data) => {
        const { status, body } = data;
        console.log('status: ' + status)
        console.log('body: ' + body);
        if (status === 200)
          return {token, user: body};
        else
          return null;
      }).catch(error => {
        console.log('UserData error: ' + error);
        return null;
      });
    }
    return null;
  } catch(err) {
    console.log('Error in isAuth: ' + err);
    return null
  }
}
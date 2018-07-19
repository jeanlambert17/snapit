import { API_URL } from '../helpers/configs';

export default async () => {
  const options = {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  }
  return fetch(`${API_URL}/post/get`, options).then(res => res.json())
  .then(data => {
    const { status, body } = data;
    console.log('GET POSTS STATUS: ' + status)
    if(status === 200) 
      return body;
    else 
      return Promise.reject(err);
  })
  .catch(err => {
    console.log(err)
    return Promise.reject(err);
  })

}
import { API_URL } from '../helpers/configs';

export default async (page,perPage) => {
  console.log('fetching posts')
  const options = {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  }
  return fetch(`${API_URL}/post/get/${page}/${perPage}`, options).then(res => res.json())
  .then(data => {
    const { status, body } = data;
    console.log('GET POSTS STAUS: ' + status)
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
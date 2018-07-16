import { API_URL } from '../helpers/configs'

export default (photo,token) => {
  let fd = new FormData();
  fd.append('image', photo);
  const options = {
    method: 'post',
    headers: {
      'x-access-token': token,
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    credentials: 'include',
    body: fd
  }
  return fetch(API_URL + '/user/updatePhoto', options).then(res => res.json())
  .then(data => {
    const { status, body } = data;
    console.log(JSON.stringify(data))
    console.log('UPLOAD PHOTO STATUS: ' + status);
    console.log('UPLOAD PHOTO BODY: ' + JSON.stringify(body))
    if(status === 200)
      return body
    else
      console.log('UPLOAD PHOTO BODY: ' + body)
      return Promise.reject(body)
    
  })
  .catch(err => {
    console.log('UPLOAD PHOTO ERR: ' + err)    
    return Promise.reject('');
  });
}
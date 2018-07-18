import { API_URL } from '../helpers/configs';

export default (form,token) => {
  let fd = new FormData();
  let keys = Object.keys(form);
  keys.forEach(key => {
    fd.append(key,form[key]);
  });
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
  return fetch(API_URL+'/post/add', options).then(res => res.json())
  .then((data) => {
    const { status, body } = data;
    console.log('addpost status: ' + status)
    console.log('addpost body: ' + JSON.stringify(body))
    if(status === 200)
      return body;
    else 
      return Promise.reject(body)
  })
  .catch((err) => {
    console.log(err)
    return Promise.reject(err.message || err);
  })
}
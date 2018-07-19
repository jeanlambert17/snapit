import { API_URL } from './configs';

export default async ({ endpoint, method, data = null, headers = {}, formdata = false }) => {
  const url = API_URL + endpoint;
  const _options = options(method,headers,data,formdata);
  console.log(_options)
  try {
    const res = await fetch(url,_options);
    const data = await res.json();
    const { status, body } = data;
    if (status == 200) 
      return body
    else
      throw body
  } catch(err) {
    return Promise.reject(err.message || err);
  }
}

const options = (method,headers,data,fd) => {
  const _options = {
    method: method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': fd? 'multipart/form-data' : 'application/json',
      ...headers,
    }
  }
  switch (method.toLowerCase()) {
    case 'get': {
      return {      
        ..._options,
      }
    }
    case 'post': {
      return {
        ..._options,
        body: processBody(data,fd)
      }
    }
    default:
      break;
  }
}

const processBody = (data,fd) => {
  if(fd) {
    let body = new FormData();
    let keys = Object.keys(data);
    keys.forEach(key => body.append(key, data[key]));
    return body
  } else {
    let body = JSON.stringify(data);
    return body
  }
}
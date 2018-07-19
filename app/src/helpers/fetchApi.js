import { API_URL } from './configs';

export default async ({ endpoint, token, method, data = null, headers = {} }) => {
  const url = API_URL + endpoint;
  const _options = options(method,headers,data,token);
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

const options = (method,headers,data,token) => {
  const _options = {
    method: method,
    credentials: 'include',
    headers: {
      'x-access-token': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    }
  }
  console.log(_options)
  switch (method.toLowerCase()) {
    case 'get': {
      return {      
        ..._options,
      }
    }
    case 'post': {
      return {
        ..._options,
        body: data
      }
    }
    default:
      break;
  }
}
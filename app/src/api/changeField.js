import configs from './configs';
import { getItem } from '../helpers/storage';
import fetchApi from '../helpers/fetchApi';

export default async (form) => {
   try {
		const token = await getItem('token');
		const url = `${configs.url}/user/changeField`;
		const options = {
			method: 'POST',
			headers: {
				'x-access-token': token,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(form)
		}
      if (token) {
			// const res = await fetch(url,options);
			return fetch(url, options).then(res => res.json()).then(({body,status}) => {
				if(status === 200) 
					return body
				else
					return Promise.reject(body);
			}).catch(err => {
				return Promise.reject(err);
			})
			
			
			// const {status,body} = res.json()
			// if(status === 200) 
			// 	return body;
			// else
			// 	Promise.reject(body);
      }
           
   } catch (err) {
      throw 'No se como deberia manejar este error'; // Logout? idk
   }
}

// export default async (form) => {
// 	try {
// 		const res = await fetchApi({endPoint: '/user/changeFields', method:'post', body: form});
// 		const data = res.json();
// 		const {status,body} = data;
// 		if(status === 200) {
// 			return body;
// 		}
// 		Promise.reject(body);
// 	} catch(err) {
// 		// Network connection, or async storage (?)
// 		Promise.reject(err);
// 	}
// }


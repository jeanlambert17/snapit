import configs from './configs';

export default async (form) => {
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
   try {
      const token = await getItem('token') || null;

      if (token) {
			const res = await fetch(url,options);
			const {status,body} = res.json()
			
			if(status === 200) 
				return body;
			throw body
      }
           
   } catch (err) {
		console.log('CHANGEFIELD ERROR: is throw body?');
		console.log(err);
      throw err;
   }
}

// fetch(`${configs.url}/user/changeField`, {
// 	method: 'POST',
// 	headers: {
// 		'x-access-token': token,
// 		'Accept': 'application/json',
// 		'Content-Type': 'application/json'
// 	},
// 	credentials: 'include',
// 	body: JSON.stringify(form)
// }).then(res => res.json()).then(({ status, body }) => {
// 	console.log('status: ' + status)
// 	console.log('body: ' + body);
// 	(status === 200) ? res(body) : rej(body);
// }).catch(error => {
// 	console.log('UserData error: ' + error);
// 	rej(error);
// })
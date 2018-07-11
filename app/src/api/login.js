import { setItem } from '../helpers/storage';
import configs from './configs';

export default (form) => new Promise((res, rej) => 
	fetch(`${configs.url}/user/login`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(form),
	}).then(res => res.json()).then(async ({ status, body, token }) => {
		console.log('Login status: ' + status);
		console.log('Login body: ' + JSON.stringify(body));
		if (status === 200) {
			await setItem('token', token);
			res(body)
		} else 
			rej(body);
	}).catch(error => {
		console.log('Login error: ' + error);
		rej('Network request failed');
	})
)
import { API_URL } from '../utils/configs';

export default (form) => {
	const options = {
		method: 'post',
		headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(form),
	}
	return fetch(`${API_URL}/user/signUp`, options).then(res => res.json())
	.then(({ status, body }) => {
		console.log('Sign up status: ' + status);
		console.log('Sign up body: ' + JSON.stringify(body));
		if(status === 200)
				return body;
		else 
				return Promise.reject(body);
	})
	.catch(error => {
		console.log('Sign up error: ' + error);
		return Promise.reject(error);
	})
}

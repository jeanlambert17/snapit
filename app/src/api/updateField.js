import { API_URL } from '../helpers/configs'

export default (form,token) => {
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
	return fetch(API_URL + '/user/updateField', options).then(res => res.json())
	.then(({body,status}) => {
		console.log('changeField status: ' + status)
		console.log('changeField body: ' + JSON.stringify(body))
		if(status === 200) 
			return body
		else
			return Promise.reject(body);
	})
	.catch(err => {
		console.log('changeField Promise reject: ' + err);
		return Promise.reject(err);
	});
}

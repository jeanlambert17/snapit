import fetchApi from '../utils/fetchApi';
import { setItem } from '../utils/storage';

export default async (form) => {
	const options = {
		method: 'post',
		endpoint: '/user/login',
		data: form,
	}

	try {
		const data = await fetchApi(options);
		await setItem('token', data.token);
		return data;
	} catch(err) {
		throw err;
	}
}
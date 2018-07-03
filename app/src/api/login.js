import { setData } from '../helpers/storage';

export default (form) => {
    return new Promise((res,rej) => {        
        fetch('http://192.168.0.108:10036/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(form),
        }).then(response => response.json()).then(({ status, body, token }) => {            
            console.log('Login status: ' + status);
            console.log('Login body: ' + body);
            setData('token', token); // Mejorar esto
            (status === 200 ? res(body) : rej(body));
        }).catch(error => {
            console.log('Login error: ' + error);
            rej('Login fetch error');
        });
    })
}
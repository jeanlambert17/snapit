export default (form) => {
    return fetch('http://localhost:10036/user/login', {
        method: 'POST',
        credentials: 'include',
        body: form,
    }).then(res => res.json())
    .then(res => {
        console.log('Login res: ' + res);
        return res;
    }).catch(error => {
        console.log('Login error: ' + error);
        return error;
    });
}
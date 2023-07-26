import axios from 'axios'

axios.defaults.baseURL = "url";
axios.defaults.withCredentials = true;

onLogin = (email, password) => {
    const data = {
        email,
        password,
    };

    axios.post('/login', data)
    .then((response)=> {
        const { accessToekn } = response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToekn}`
        console.log(response.data)
    }).catch((error)=> {
        console.log(error)
    })
}

export default onLogin

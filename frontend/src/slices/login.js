import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:8080/login',
  headers: {
    'Content-type': 'application/json'
  }
});

async function findById(userid, success, fail) {
  axiosApi.defaults.headers['accessToken'] = sessionStorage.getItem('accessToken');
  console.log(userid);
  await axiosApi.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  axiosApi.defaults.headers['refreshToken'] = sessionStorage.getItem('refreshToken'); //axios header에 refresh-token 셋팅
  await axiosApi.post(`/user/refresh`, user).then(success).catch(fail);
}

export { findById, tokenRegeneration };
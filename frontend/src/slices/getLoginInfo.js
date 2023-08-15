import {
  setToken,
  setIsLogin,
  setIsLoginError,
  setIsValidToken,
  setUserEmail,
  setNickname,
  setTodayBium,
  setTotalBium
} from './userSlice';

import axios from 'axios';
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? 'https://i9c205.p.ssafy.io' : 'http://localhost:8080';

// 사용자 로그인 처리 함수
export const userLogin = (user) => async (dispatch) => {
  try {
    const response = await axios
      .post(APPLICATION_SERVER_URL + '/api/login', user)
      .then((response) => {
        return response;
      })
      .catch(() => {
        alert('로그인 실패');
      });
    if (response.data.message === 'success') {
      const accessToken = response.data.httpHeaders;
      sessionStorage.setItem('accessToken', accessToken);
      dispatch(setToken(accessToken));
      dispatch(setIsLogin(true));
      dispatch(setIsLoginError(false));
      dispatch(setIsValidToken(true));
    } else {
      dispatch(setIsLogin(false));
      dispatch(setIsLoginError(true));
      dispatch(setIsValidToken(false));
    }
  } catch (error) {}
};

// 사용자 정보를 가져오는 동작 처리 함수
export const getUserInfo = (Email) => async (dispatch) => {
  try {
    const response = await axios.get(APPLICATION_SERVER_URL + `/api/info/${Email}`);
    dispatch(setUserEmail(response.data.userInfo.userEmail));
    dispatch(setNickname(response.data.userInfo.userNickname));
    dispatch(setTodayBium(response.data.userInfo.todayBium));
    dispatch(setTotalBium(response.data.userInfo.totalBium));
    return response.data;
  } catch (error) {
    dispatch(setIsValidToken(false));
    return error;
  }
};

import { setToken, setIsLogin, setIsLoginError, setIsValidToken, setUserEmail, setNickname, setTodayBium, setTotalBium } from './userSlice';

import axios from 'axios';

// 사용자 로그인 처리 함수
export const userLogin = (user) => async (dispatch) => {
  try {
    const response = await axios
      .post('https://i9c205.p.ssafy.io/api/login', user)
      .then((response) => {
        return response;
      })
      .catch(() => {
        console.log('userLogin 실패');
        alert('로그인 실패');
      });
    console.log('getuserInfo의 response', response);
    if (response.data.message === 'success') {
      const accessToken = response.data.httpHeaders;
      sessionStorage.setItem('accessToken', accessToken);
      // sessionStorage.setItem('refreshToken', refreshToken);
      dispatch(setToken(accessToken));
      dispatch(setIsLogin(true));
      dispatch(setIsLoginError(false));
      dispatch(setIsValidToken(true));
    } else {
      dispatch(setIsLogin(false));
      dispatch(setIsLoginError(true));
      dispatch(setIsValidToken(false));
    }
  } catch (error) {
    console.log(error);
  }
};

// 사용자 정보를 가져오는 동작 처리 함수
export const getUserInfo = (Email) => async (dispatch) => {
  try {
    const response = await axios.get(`https://i9c205.p.ssafy.io/api/info/${Email}`);
    // console.log('함수 확인');
    console.log(response.data.userInfo);
    dispatch(setUserEmail(response.data.userInfo.userEmail));
    dispatch(setNickname(response.data.userInfo.userNickname));
    dispatch(setTodayBium(response.data.userInfo.todayBium));
    dispatch(setTotalBium(response.data.userInfo.totalBium));
    console.log('setUserEmail입니다.', setUserEmail(response.data.userInfo.userEmail));
    console.log('setNickname입니다.', setNickname(response.data.userInfo.userNickname));
    console.log('setTodayBium입니다.', setTodayBium(response.data.userInfo.todayBium));
    console.log('setTotalBium입니다.', setTotalBium(response.data.userInfo.totalBium));
    return response.data;
  } catch (error) {
    console.error('토큰 만료되어 사용 불가능', error.response.status);
    dispatch(setIsValidToken(false));
    // await dispatch(tokenRegeneration());
    return error;
  }
};

// // 토큰 갱신 동작 처리 함수
// export const tokenRegenerationAction = () => async (dispatch, getState) => {
//   try {
//     console.log(dispatch, getState);
//     const state = getState();
//     console.log('토큰 재발급 >> 기존 토큰 정보: ', sessionStorage.getItem('accessToken'));
//     const response = await tokenRegeneration(JSON.stringfy(state.user.userInfo));
//     if (response.message === 'success') {
//       const { accessToken: accessToken } = response;
//       sessionStorage.setItem('accessToken', accessToken);
//       dispatch(setIsValidToken(true));
//     }
//   } catch (error) {
//     if (error.response.status === 401) {
//       console.log('갱신 실패');
//     }
//   }
// };

import { setIsLogin, setIsLoginError, setIsValidToken, setUserInfo } from './userSlice';
import jwtDecode from 'jwt-decode';
import { findById, tokenRegeneration } from './login';
import axios from 'axios';

// 사용자 로그인 처리 함수
export const userLogin = (user) => async (dispatch) => {
  try {
    const response = await axios
      .post('http://localhost:8080/login', user)
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
export const getUserInfo = (token, Email) => async (dispatch) => {
  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const response = await axios
      .get(`http://localhost:8080/info/${Email}`, { headers: { Authorization: decodedToken.sub } })
      .then((response) => {
        console.log('함수 확인');
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log('getUserInfo 실패');
        return err;
      });
  } catch (error) {
    console.error('토큰 만료되어 사용 불가능', error.response.status);
    dispatch(setIsValidToken(false));
    await dispatch(tokenRegeneration());
  }
};

// 토큰 갱신 동작 처리 함수
export const tokenRegenerationAction = () => async (dispatch, getState) => {
  try {
    console.log(dispatch, getState);
    const state = getState();
    console.log('토큰 재발급 >> 기존 토큰 정보: ', sessionStorage.getItem('accessToken'));
    const response = await tokenRegeneration(JSON.stringfy(state.user.userInfo));
    if (response.message === 'success') {
      const { accessToken: accessToken } = response;
      sessionStorage.setItem('accessToken', accessToken);
      dispatch(setIsValidToken(true));
    }
  } catch (error) {
    if (error.response.status === 401) {
      console.log('갱신 실패');
    }
  }
};
